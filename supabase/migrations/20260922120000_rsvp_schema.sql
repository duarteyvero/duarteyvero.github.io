-- =============================================================================
-- RSVP: respuestas de invitados + acompañantes, y panel de los novios
-- =============================================================================
-- Seguridad:
--   * anon no toca las tablas: solo puede ejecutar submit_rsvp().
--   * Solo los usuarios presentes en public.admins pueden leer/borrar.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Tablas
-- -----------------------------------------------------------------------------
create table public.rsvps (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  attending   boolean not null,
  message     text check (char_length(message) <= 1000)
);

comment on table public.rsvps is 'Una respuesta del formulario: agrupa al titular y sus acompañantes.';

create table public.guests (
  id             uuid primary key default gen_random_uuid(),
  rsvp_id        uuid not null references public.rsvps (id) on delete cascade,
  position       smallint not null check (position between 0 and 20),
  is_primary     boolean generated always as (position = 0) stored,
  first_name     text not null check (char_length(first_name) between 1 and 80),
  last_name      text not null check (char_length(last_name) between 1 and 80),
  allergies      text check (char_length(allergies) <= 300),
  needs_bus      boolean,
  favorite_song  text check (char_length(favorite_song) <= 150),
  created_at     timestamptz not null default now(),
  unique (rsvp_id, position)
);

comment on table public.guests is 'Personas de una respuesta. position 0 = titular, 1..20 = acompañantes.';

create table public.admins (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now()
);

comment on table public.admins is 'Usuarios (los novios) con acceso al panel /admin. Se rellena a mano.';

-- -----------------------------------------------------------------------------
-- Row Level Security
-- -----------------------------------------------------------------------------
alter table public.rsvps  enable row level security;
alter table public.guests enable row level security;
alter table public.admins enable row level security;

revoke all on public.rsvps, public.guests, public.admins from anon, authenticated;
grant select, delete on public.rsvps, public.guests to authenticated;
grant select on public.admins to authenticated;

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create policy "Los novios leen las respuestas"
  on public.rsvps for select to authenticated
  using ((select public.is_admin()));

create policy "Los novios borran respuestas"
  on public.rsvps for delete to authenticated
  using ((select public.is_admin()));

create policy "Los novios leen los invitados"
  on public.guests for select to authenticated
  using ((select public.is_admin()));

create policy "Los novios borran invitados"
  on public.guests for delete to authenticated
  using ((select public.is_admin()));

create policy "Cada admin se ve a sí mismo"
  on public.admins for select to authenticated
  using (user_id = (select auth.uid()));

-- -----------------------------------------------------------------------------
-- Envío del formulario (única puerta de entrada pública)
-- -----------------------------------------------------------------------------
-- payload:
-- {
--   "attending": true,
--   "message": "¡Enhorabuena!",
--   "website": "",                       -- honeypot: si viene relleno se ignora
--   "guests": [                          -- [0] = titular, resto = acompañantes (máx. 20)
--     { "firstName": "Ana", "lastName": "García", "allergies": "Frutos secos",
--       "needsBus": true, "favoriteSong": "September – Earth, Wind & Fire" }
--   ]
-- }
create function public.submit_rsvp(payload jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attending   boolean := (payload ->> 'attending')::boolean;
  v_guests      jsonb   := coalesce(payload -> 'guests', '[]'::jsonb);
  v_guest_count integer;
  v_rsvp_id     uuid;
begin
  -- Bot: se descarta sin dar pistas.
  if coalesce(payload ->> 'website', '') <> '' then
    return;
  end if;

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

  if v_attending and exists (
    select 1 from jsonb_array_elements(v_guests) g
    where jsonb_typeof(g -> 'needsBus') is distinct from 'boolean'
  ) then
    raise exception 'Falta indicar si necesitáis autobús' using errcode = '22023';
  end if;

  insert into public.rsvps (attending, message)
  values (v_attending, nullif(btrim(payload ->> 'message'), ''))
  returning id into v_rsvp_id;

  -- Si no asiste, las preguntas del día no aplican.
  insert into public.guests (
    rsvp_id, position, first_name, last_name, allergies, needs_bus, favorite_song
  )
  select
    v_rsvp_id,
    (g.ord - 1)::smallint,
    btrim(g.value ->> 'firstName'),
    btrim(g.value ->> 'lastName'),
    case when v_attending then nullif(btrim(g.value ->> 'allergies'), '') end,
    case when v_attending then (g.value ->> 'needsBus')::boolean end,
    case when v_attending then nullif(btrim(g.value ->> 'favoriteSong'), '') end
  from jsonb_array_elements(v_guests) with ordinality as g (value, ord);
end;
$$;

revoke execute on function public.submit_rsvp(jsonb) from public;
grant execute on function public.submit_rsvp(jsonb) to anon, authenticated;
