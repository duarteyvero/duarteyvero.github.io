-- =============================================================================
-- Edición de respuestas desde /admin
-- =============================================================================
-- * La validación y el alta de invitados pasan a funciones internas (esquema
--   private, fuera de la API) para que submit_rsvp y update_rsvp apliquen
--   exactamente las mismas reglas.
-- * update_rsvp: solo admins. Sustituye la respuesta completa (asistencia,
--   mensaje y personas) en una sola transacción, conservando su created_at.
-- =============================================================================

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

-- -----------------------------------------------------------------------------
-- Reglas compartidas
-- -----------------------------------------------------------------------------
create function private.validate_rsvp_payload(payload jsonb)
returns void
language plpgsql
immutable
set search_path = ''
as $$
declare
  v_attending   boolean := (payload ->> 'attending')::boolean;
  v_guests      jsonb   := coalesce(payload -> 'guests', '[]'::jsonb);
  v_guest_count integer;
begin
  if v_attending is null then
    raise exception 'Falta indicar si asistes' using errcode = '22023';
  end if;

  if jsonb_typeof(v_guests) <> 'array' then
    raise exception 'Formato de invitados no válido' using errcode = '22023';
  end if;

  v_guest_count := jsonb_array_length(v_guests);

  if v_guest_count < 1 then
    raise exception 'Falta el nombre del invitado' using errcode = '22023';
  end if;

  if v_guest_count > 21 then
    raise exception 'Máximo 20 acompañantes' using errcode = '22023';
  end if;

  if not v_attending and v_guest_count > 1 then
    raise exception 'Sin asistencia no se pueden añadir acompañantes' using errcode = '22023';
  end if;

  if exists (
    select 1 from jsonb_array_elements(v_guests) g
    where coalesce(btrim(g ->> 'firstName'), '') = '' or coalesce(btrim(g ->> 'lastName'), '') = ''
  ) then
    raise exception 'Falta el nombre o los apellidos de alguien' using errcode = '22023';
  end if;

  if v_attending and exists (
    select 1 from jsonb_array_elements(v_guests) g
    where jsonb_typeof(g -> 'needsBus') is distinct from 'boolean'
  ) then
    raise exception 'Falta indicar si necesitáis autobús' using errcode = '22023';
  end if;
end;
$$;

-- Si no asiste, las preguntas del día no aplican.
create function private.insert_rsvp_guests(p_rsvp_id uuid, p_attending boolean, p_guests jsonb)
returns void
language sql
set search_path = ''
as $$
  insert into public.guests (
    rsvp_id, position, first_name, last_name, allergies, needs_bus, favorite_song
  )
  select
    p_rsvp_id,
    (g.ord - 1)::smallint,
    btrim(g.value ->> 'firstName'),
    btrim(g.value ->> 'lastName'),
    case when p_attending then nullif(btrim(g.value ->> 'allergies'), '') end,
    case when p_attending then (g.value ->> 'needsBus')::boolean end,
    case when p_attending then nullif(btrim(g.value ->> 'favoriteSong'), '') end
  from jsonb_array_elements(p_guests) with ordinality as g (value, ord);
$$;

revoke execute on all functions in schema private from public, anon, authenticated;

-- -----------------------------------------------------------------------------
-- Envío público: mismo contrato, ahora sobre las reglas compartidas
-- -----------------------------------------------------------------------------
create or replace function public.submit_rsvp(payload jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attending boolean := (payload ->> 'attending')::boolean;
  v_rsvp_id   uuid;
begin
  -- Bot: se descarta sin dar pistas.
  if coalesce(payload ->> 'website', '') <> '' then
    return;
  end if;

  perform private.validate_rsvp_payload(payload);

  insert into public.rsvps (attending, message)
  values (v_attending, nullif(btrim(payload ->> 'message'), ''))
  returning id into v_rsvp_id;

  perform private.insert_rsvp_guests(v_rsvp_id, v_attending, payload -> 'guests');
end;
$$;

-- -----------------------------------------------------------------------------
-- Edición desde /admin
-- -----------------------------------------------------------------------------
-- target_id: la respuesta a sustituir. payload: mismo formato que submit_rsvp.
create function public.update_rsvp(target_id uuid, payload jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attending boolean := (payload ->> 'attending')::boolean;
begin
  if not public.is_admin() then
    raise exception 'Solo los novios pueden editar respuestas' using errcode = '42501';
  end if;

  perform private.validate_rsvp_payload(payload);

  update public.rsvps
  set attending = v_attending,
      message   = nullif(btrim(payload ->> 'message'), '')
  where id = target_id;

  if not found then
    raise exception 'Esta respuesta ya no existe' using errcode = '22023';
  end if;

  delete from public.guests where rsvp_id = target_id;
  perform private.insert_rsvp_guests(target_id, v_attending, payload -> 'guests');
end;
$$;

revoke execute on function public.update_rsvp(uuid, jsonb) from public, anon;
grant execute on function public.update_rsvp(uuid, jsonb) to authenticated;
