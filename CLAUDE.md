# CLAUDE.md — Invitación de boda Duarte & Vero

Web tipo invitación para los invitados de la boda de **Duarte & Vero** (17 · 07 · 2027, Jardín El Botero), con formulario de confirmación de asistencia y un panel privado para los novios.
Estamos migrando el HTML plano (`index.html`) a **Vite + React + TypeScript + Tailwind CSS**, con **Ant Design** para los componentes complejos, **Supabase** como backend (base de datos + auth) y **Netlify** como hosting.

> Nivel de exigencia: calidad de frontend senior de Google. Código limpio, predecible, accesible y rápido. Nada de "ya lo arreglaremos luego".

---

## 1. Alcance

- **`/` — Invitación pública**: hero, historia, viajes, pedida, cuenta atrás, lugar, horarios y **formulario RSVP** (con acompañantes).
- **`/admin` — Panel de los novios**: login con Supabase Auth y listado/resumen de respuestas.
- **No**: SEO, GEO, SSR, i18n, analítica. Dentro de `/` la navegación es por anclas (`#historia`, `#botero`, `#dia`, `#rsvp`).
- Idioma de la UI: **español** (tuteo/vosotros, tono cercano como en el original).

## 2. Stack

| Pieza | Elección | Notas |
|---|---|---|
| Gestor de paquetes | **pnpm** | Nunca `npm` ni `yarn`. Solo se commitea `pnpm-lock.yaml`; fijar versión con `packageManager` en `package.json` |
| Build | Vite | `base: '/'` |
| UI | React + TypeScript (`strict: true`) | Solo componentes funcionales y hooks |
| Routing | React Router | `/` y `/admin`; `/admin` con `lazy()` para que los invitados no descarguen su código |
| Estilos | Tailwind CSS v4 | Tokens de diseño en `@theme` (ver §4) |
| Componentes | Ant Design v5 | Form, Input, Radio, Switch, Table, Statistic, Tag, `message`… Tematizado con `ConfigProvider` usando los mismos tokens |
| Backend | Supabase (`@supabase/supabase-js`) | Postgres + RLS + Auth. Sin servidor propio |
| Hosting | Netlify | SPA con fallback a `index.html` |
| Lint/format | ESLint + Prettier + `prettier-plugin-tailwindcss` | Ordenación automática de clases |

No añadir más dependencias sin justificarlo. Antes de instalar una librería, comprobar si Tailwind, antd o 10 líneas propias lo resuelven.

## 3. Estructura del proyecto

```
src/
  main.tsx                  # bootstrap + ConfigProvider (tema antd) + StyleProvider + Router
  router.tsx                # rutas; /admin con lazy()
  index.css                 # @import tailwind, @theme (tokens), @layer base
  lib/
    supabase.ts             # ÚNICA instancia del cliente Supabase
    cn.ts                   # clsx + tailwind-merge
  content/
    wedding.ts              # ÚNICA fuente de verdad: nombres, fecha, textos, horarios, fotos, enlaces
  assets/images/            # fotos optimizadas; nunca base64 inline
  components/
    ui/                     # primitivas reutilizables sin conocimiento del dominio
      Section.tsx  Container.tsx  Kicker.tsx  Heading.tsx  Lead.tsx  Script.tsx
      Button.tsx  Reveal.tsx  Photo.tsx  SplitSection.tsx  StatGrid.tsx
  features/
    invitation/             # página pública
      InvitationPage.tsx
      sections/             # Hero, Story, Travels, Proposal, Ring, Countdown, Venue, Schedule, Rsvp, Footer
    rsvp/
      RsvpForm.tsx
      GuestFields.tsx       # nombre, apellidos, alergias, bus, canción — reutilizado por titular y acompañantes
      CompanionsList.tsx    # Form.List para añadir/quitar acompañantes
      rsvp.service.ts       # submitRsvp() → RPC de Supabase
      rsvp.schema.ts        # tipos + reglas de validación compartidas
    admin/
      AdminPage.tsx
      LoginForm.tsx
      RequireAuth.tsx       # guard de ruta
      RsvpSummary.tsx       # estadísticas (asistentes, bus, alergias, canciones)
      RsvpTable.tsx         # tabla con acompañantes expandibles, filtros y búsqueda
      admin.service.ts      # consultas de lectura
  hooks/
    useCountdown.ts  useInView.ts  useSession.ts
  types/
    database.ts             # generado con `supabase gen types typescript` — no editar a mano
supabase/
  migrations/               # SQL versionado (tablas, RLS, funciones). Única forma de cambiar el esquema
netlify.toml
```

## 4. Diseño (respetar el estilo actual)

El `index.html` actual es la **referencia visual**. La migración debe verse igual (o mejor), no reinterpretarse.

**Paleta** → tokens de Tailwind en `@theme` (nunca hex sueltos en componentes):

```css
@theme {
  --color-paper:  #f1ede4;
  --color-paper2: #e5dfd2;
  --color-ink:    #25261f;
  --color-muted:  #77776e;
  --color-olive:  #56614d;
  --color-dark:   #30382d;
  --color-white:  #fbfaf6;
  --color-line:   rgb(37 38 31 / .15);

  --font-serif:  "Cormorant Garamond", serif;   /* titulares, números */
  --font-sans:   "DM Sans", sans-serif;          /* cuerpo, peso 300 */
  --font-script: "Parisienne", cursive;          /* frases manuscritas */
}
```

**Lenguaje visual a conservar**:
- Titulares grandes en Cormorant, peso 300–400, `letter-spacing` negativo, `line-height` muy apretado (~.82), tamaños con `clamp()`.
- Kickers/etiquetas: 8–9px, MAYÚSCULAS, tracking amplio (.22em–.45em), color olive o muted.
- Cuerpo: DM Sans 300, 13–14px, `line-height: 2`.
- Separadores finos (`border-line`), marcos dobles del hero, círculo decorativo en la intro.
- Alternancia de fondos: `paper` / `paper2` / `dark` (Pedida y RSVP en oscuro).
- Animación `reveal`: fade + `translateY(25px)`, 0.9s, al entrar en viewport. Respetar `prefers-reduced-motion`.
- Responsive: breakpoints equivalentes a 760px y 560px del original (rejillas de 4 → 2 columnas, split → 1 columna).
- **El panel `/admin` usa la misma paleta y tipografías**, pero prioriza legibilidad: más antd "de serie" (tablas, estadísticas) con el tema aplicado.

**Ant Design** debe parecer parte del diseño, no "antd por defecto": `ConfigProvider` con `colorPrimary: olive`, `borderRadius: 0`, `fontFamily: DM Sans`, inputs coherentes con la sección oscura del RSVP.
Evitar conflictos Tailwind ↔ antd: usar `StyleProvider layer` de `@ant-design/cssinjs` y ordenar `@layer` para que Tailwind pueda sobrescribir.

## 5. Normas de código

### DRY y componentización
- **Si un patrón aparece 2 veces, es un componente.** Ya identificados en el HTML: kicker + h2 + lead (6 secciones), bloque foto/texto (Pedida, Anillo), rejilla con bordes (Cuenta atrás, Horarios), tarjetas con foto y pie (Viajes, galería del Botero). En el formulario: **los campos de una persona son el mismo componente (`GuestFields`) para el titular y para cada acompañante**.
- **El contenido vive en `content/wedding.ts`**, no en el JSX. Las secciones iteran datos. Cambiar un horario o un texto = tocar un solo fichero.
- La fecha de la boda se define **una vez** (`2027-07-17T18:30:00+02:00`) y de ahí se derivan hero, cuenta atrás y footer.
- Variantes con props tipadas (`tone="light" | "dark"`), no copias de componentes. Clases condicionales con `cn()`.
- Componentes pequeños: si un fichero supera ~120 líneas o hace dos cosas, se divide.
- Organización por **feature** (`features/rsvp`, `features/admin`); `components/ui` solo contiene piezas genéricas.

### React / TypeScript
- Componentes funcionales, named exports, un componente por fichero, nombre de fichero = nombre del componente.
- Props tipadas con `type`, sin `any`. Los tipos de filas de BD salen de `types/database.ts` (generado).
- Lógica con efectos → custom hooks. Los componentes de sección no contienen `useEffect`.
- Nada de manipulación directa del DOM (`getElementById`, `querySelectorAll`): lo del script original se reescribe como hooks.
- Los componentes **nunca** llaman a `supabase` directamente: siempre a través de `*.service.ts`.
- Sin librerías de estado global. La sesión se lee con `useSession()` (basado en `supabase.auth.onAuthStateChange`).

### Estilos
- Tailwind para todo. Sin CSS modules ni `.css` por componente. `index.css` solo para `@theme`, fuentes y `@layer base`.
- Prohibido `style={{…}}` salvo valores realmente dinámicos (p. ej. `backgroundImage` que viene de datos).
- Prohibido `!important` (el original lo usa; se corrige desde la raíz).
- Mobile-first: clases base = móvil, `md:`/`lg:` para escritorio. La mayoría de invitados abrirá la web desde el móvil (WhatsApp).

### Imágenes y rendimiento
- El HTML original incrusta las fotos en **base64** (~1.6 MB de HTML). En la migración van a `src/assets/images/` como ficheros, importadas desde `content/wedding.ts`, con `loading="lazy"` (salvo las del primer pantallazo), `decoding="async"` y `alt` descriptivo.
- Redimensionar/comprimir fotos (máx. ~2000px lado largo, WebP o JPG calidad ~80).
- Las fotos de El Botero se descargan a `assets/` en vez de enlazarlas desde `jardinelbotero.com`.
- Fuentes de Google con `<link rel="preconnect">` + `display=swap` en `index.html`, no con `@import` en CSS.

### Accesibilidad (no negociable)
- HTML semántico: `header`, `nav`, `main`, `section` con `aria-labelledby`, `footer`. Un único `h1` por página.
- Formulario usable con teclado, labels visibles, errores anunciados. Al añadir un acompañante, el foco va a su primer campo.
- Contraste suficiente en la sección oscura. `prefers-reduced-motion` desactiva `Reveal` y el zoom de las fotos.

## 6. Formulario RSVP

Sustituye al botón "Confirmar asistencia" (que ahora apunta a `#`). Vive en la sección `#rsvp` (fondo `dark`).

**Flujo**:
1. Titular: **nombre**, **apellidos**, **¿asistes?** (sí/no).
2. Si **no asiste** → solo mensaje opcional y enviar. No se muestran acompañantes.
3. Si **asiste** → sus preguntas personales + lista de acompañantes (`Form.List`) con "Añadir acompañante" / "Quitar".
4. Mensaje opcional para los novios y enviar.

**Preguntas por persona** (titular y cada acompañante, mismo componente `GuestFields`):

| Campo | Tipo | Obligatorio |
|---|---|---|
| `firstName` | texto | sí |
| `lastName` | texto | sí |
| `allergies` | texto libre (alergias / intolerancias / dieta) | no |
| `needsBus` | sí / no | sí |
| `favoriteSong` | texto ("canción – artista") | no |

- Validación: nombres con `trim`, longitudes máximas (nombre/apellidos 80, alergias 300, canción 150, mensaje 1000) definidas **una vez** en `rsvp.schema.ts` y replicadas como `check` en la BD.
- Máximo **20 acompañantes** por respuesta (constante en `rsvp.schema.ts` y `check` en la función SQL).
- Estados: `idle → submitting → success | error`. Botón deshabilitado mientras envía. Éxito cálido ("¡Gracias! Nos vemos el 17 de julio") sustituyendo el formulario.
- Honeypot oculto contra spam; si viene relleno, se descarta en la función SQL.

## 7. Supabase

### Modelo de datos
```
rsvps                               guests
─────────────────────────           ─────────────────────────────
id           uuid pk                id             uuid pk
created_at   timestamptz            rsvp_id        uuid fk → rsvps (on delete cascade)
attending    boolean                is_primary     boolean      -- true = titular
message      text null              first_name     text
                                    last_name      text
                                    allergies      text null
                                    needs_bus      boolean null
                                    favorite_song  text null
                                    created_at     timestamptz
```
Una respuesta (`rsvps`) agrupa al titular y sus acompañantes (`guests`). Si `attending = false`, solo existe el titular con las preguntas personales a `null`.

### Seguridad (RLS obligatoria en todas las tablas)
- El público (`anon`) **no tiene acceso directo** a las tablas: ni `select`, ni `insert`.
- El envío se hace con una función RPC `submit_rsvp(payload jsonb)` **`security definer`** que valida e inserta `rsvps` + `guests` en **una sola transacción** (sin respuestas a medias) y se concede solo `execute` a `anon`.
- Lectura: solo usuarios autenticados que estén en la tabla `admins` (`user_id`), comprobado con una función `is_admin()` en las políticas `select`. Los novios también pueden `delete` (limpiar duplicados).
- En Supabase Auth: **registro público desactivado**. Las dos cuentas (Duarte y Vero) se crean a mano desde el dashboard y se añaden a `admins`.
- La clave pública (`anon`/publishable) va en el frontend; la `service_role` **jamás** se usa en el cliente ni se commitea.

### Flujo de trabajo con BD
- Todo cambio de esquema/políticas/funciones = nueva migración en `supabase/migrations/` (Supabase CLI). Nada de cambios "a mano" en el dashboard sin su migración.
- Tras cada migración: `supabase gen types typescript` → `src/types/database.ts`.

## 8. Panel de los novios (`/admin`)

- `RequireAuth` redirige a login si no hay sesión; login con email + contraseña (`supabase.auth.signInWithPassword`). Botón de cerrar sesión.
- **Resumen** (`Statistic`): respuestas recibidas, personas que asisten, que no asisten, plazas de autobús, nº de personas con alergias.
- **Tabla** de respuestas: titular, asistencia, nº acompañantes, fecha; fila expandible con cada persona y sus respuestas. Búsqueda por nombre y filtros (asiste / bus / con alergias).
- **Listas rápidas**: alergias (persona → alergia, para el catering) y canciones (para el DJ).
- **Exportar a CSV** (para catering y autobús), generado en cliente sin librerías extra.
- No indexable: `<meta name="robots" content="noindex">` en la ruta.

## 9. Despliegue (Netlify)

- **GitHub Pages queda descartado**: se elimina `.github/workflows/static.yml`.
- Netlify conectado al repo. `netlify.toml`:
  - `build.command = "pnpm build"` (Netlify detecta pnpm por `pnpm-lock.yaml`), `build.publish = "dist"`.
  - Redirect SPA: `/* → /index.html 200` (necesario para que `/admin` funcione al recargar).
- Variables de entorno en Netlify: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. En local, `.env.local` (en `.gitignore`); se commitea un `.env.example` sin valores.
- Deploy previews de Netlify para revisar las ramas antes de mergear.
- `index.html` e `indexv1.html` originales se mueven a `legacy/` al crear el proyecto Vite (Vite usa `index.html` como entrada) y se borran cuando la versión React esté validada visualmente contra ellos.

## 10. Flujo de trabajo

- Rama de trabajo: `migrationReact`. Se mergea a `main` solo cuando está completa y revisada.
- Antes de dar algo por terminado: `pnpm lint`, `pnpm build` sin errores ni warnings de TS, y revisión visual en móvil (375px) y escritorio (1440px) comparando con el original.
- Probar el RSVP de extremo a extremo (asiste con 2 acompañantes / no asiste) y comprobar en `/admin` que aparece correctamente.
- Commits pequeños y descriptivos, en español, uno por sección/componente/migración.
- Scripts esperados en `package.json`: `dev`, `build`, `preview`, `lint`, `format`, `db:types`.
