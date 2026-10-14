-- =============================================================================
-- RSVP: plato principal y color favorito (por persona, obligatorios si asiste)
-- =============================================================================
-- * main_course: 'meat' (entrecot) o 'fish' (lubina). Los textos de cada plato
--   viven en src/content/wedding.ts.
-- * favorite_color: texto libre, máx. 40 caracteres.
-- * Las respuestas anteriores quedan a null; al editarlas desde /admin habrá
--   que rellenar ambos campos.
-- =============================================================================

alter table public.guests
  add column main_course text check (main_course in ('meat', 'fish')),
  add column favorite_color text check (char_length(favorite_color) between 1 and 40);

comment on column public.guests.main_course is 'Plato principal: meat = entrecot, fish = lubina. null si no asiste.';
comment on column public.guests.favorite_color is 'Color favorito. null si no asiste.';

-- -----------------------------------------------------------------------------
-- Reglas compartidas: + plato y color obligatorios si asiste
-- -----------------------------------------------------------------------------
create or replace function private.validate_rsvp_payload(payload jsonb)
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

  if v_attending and exists (
    select 1 from jsonb_array_elements(v_guests) g
    where (g ->> 'mainCourse') is null or (g ->> 'mainCourse') not in ('meat', 'fish')
  ) then
    raise exception 'Falta elegir el plato principal de alguien' using errcode = '22023';
  end if;

  if v_attending and exists (
    select 1 from jsonb_array_elements(v_guests) g
    where coalesce(btrim(g ->> 'favoriteColor'), '') = ''
  ) then
    raise exception 'Falta el color favorito de alguien' using errcode = '22023';
  end if;
end;
$$;

-- Si no asiste, las preguntas del día no aplican.
create or replace function private.insert_rsvp_guests(p_rsvp_id uuid, p_attending boolean, p_guests jsonb)
returns void
language sql
set search_path = ''
as $$
  insert into public.guests (
    rsvp_id, position, first_name, last_name, allergies, needs_bus,
    main_course, favorite_color, favorite_song
  )
  select
    p_rsvp_id,
    (g.ord - 1)::smallint,
    btrim(g.value ->> 'firstName'),
    btrim(g.value ->> 'lastName'),
    case when p_attending then nullif(btrim(g.value ->> 'allergies'), '') end,
    case when p_attending then (g.value ->> 'needsBus')::boolean end,
    case when p_attending then g.value ->> 'mainCourse' end,
    case when p_attending then nullif(btrim(g.value ->> 'favoriteColor'), '') end,
    case when p_attending then nullif(btrim(g.value ->> 'favoriteSong'), '') end
  from jsonb_array_elements(p_guests) with ordinality as g (value, ord);
$$;

revoke execute on all functions in schema private from public, anon, authenticated;
