-- =============================================================================
-- Panel de los novios: notas privadas y respuestas añadidas a mano
-- =============================================================================
-- * admin_note: nota que solo ven los novios ("primo de Vero", "mesa 4"…).
--   submit_rsvp la ignora: el público nunca puede escribirla.
-- * source: 'web' (formulario público) o 'admin' (añadida desde /admin).
-- * create_rsvp / update_rsvp: solo admins, mismas reglas que submit_rsvp.
-- =============================================================================

alter table public.rsvps
  add column admin_note text check (char_length(admin_note) <= 1000),
  add column source text not null default 'web' check (source in ('web', 'admin'));

comment on column public.rsvps.admin_note is 'Nota privada de los novios. Nunca llega desde el formulario público.';
comment on column public.rsvps.source is 'web = formulario público, admin = añadida a mano desde /admin.';

-- -----------------------------------------------------------------------------
-- Comprobación de admin compartida
-- -----------------------------------------------------------------------------
create function private.require_admin()
returns void
language plpgsql
stable
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'Solo los novios pueden gestionar respuestas' using errcode = '42501';
  end if;
end;
$$;

revoke execute on function private.require_admin() from public, anon, authenticated;

-- -----------------------------------------------------------------------------
-- Alta a mano (WhatsApp, teléfono…)
-- -----------------------------------------------------------------------------
-- payload: mismo formato que submit_rsvp + "adminNote". Devuelve el id creado.
create function public.create_rsvp(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attending boolean := (payload ->> 'attending')::boolean;
  v_rsvp_id   uuid;
begin
  perform private.require_admin();
  perform private.validate_rsvp_payload(payload);

  insert into public.rsvps (attending, message, admin_note, source)
  values (
    v_attending,
    nullif(btrim(payload ->> 'message'), ''),
    nullif(btrim(payload ->> 'adminNote'), ''),
    'admin'
  )
  returning id into v_rsvp_id;

  perform private.insert_rsvp_guests(v_rsvp_id, v_attending, payload -> 'guests');

  return v_rsvp_id;
end;
$$;

revoke execute on function public.create_rsvp(jsonb) from public, anon;
grant execute on function public.create_rsvp(jsonb) to authenticated;

-- -----------------------------------------------------------------------------
-- Edición: ahora también guarda la nota privada
-- -----------------------------------------------------------------------------
create or replace function public.update_rsvp(target_id uuid, payload jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attending boolean := (payload ->> 'attending')::boolean;
begin
  perform private.require_admin();
  perform private.validate_rsvp_payload(payload);

  update public.rsvps
  set attending  = v_attending,
      message    = nullif(btrim(payload ->> 'message'), ''),
      admin_note = nullif(btrim(payload ->> 'adminNote'), '')
  where id = target_id;

  if not found then
    raise exception 'Esta respuesta ya no existe' using errcode = '22023';
  end if;

  delete from public.guests where rsvp_id = target_id;
  perform private.insert_rsvp_guests(target_id, v_attending, payload -> 'guests');
end;
$$;
