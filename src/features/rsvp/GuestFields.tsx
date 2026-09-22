import { Form, Input, Radio } from 'antd'
import { LIMITS, rules } from './rsvp.schema'

const busOptions = [
  { label: 'Sí, lo necesito', value: true },
  { label: 'No, gracias', value: false },
]

type FieldsProps = {
  /** Ruta de la persona dentro del formulario: ['primary'] o [field.name] dentro de Form.List */
  prefix: (string | number)[]
}

const path = (prefix: FieldsProps['prefix'], field: string) => [...prefix, field]

export function GuestNameFields({ prefix, autoFocus }: FieldsProps & { autoFocus?: boolean }) {
  return (
    <div className="grid gap-x-6 md:grid-cols-2">
      <Form.Item
        label="Nombre"
        name={path(prefix, 'firstName')}
        rules={rules.requiredText('Falta el nombre', LIMITS.name)}
      >
        <Input autoComplete="off" autoFocus={autoFocus} maxLength={LIMITS.name} />
      </Form.Item>

      <Form.Item
        label="Apellidos"
        name={path(prefix, 'lastName')}
        rules={rules.requiredText('Faltan los apellidos', LIMITS.name)}
      >
        <Input autoComplete="off" maxLength={LIMITS.name} />
      </Form.Item>
    </div>
  )
}

/** Preguntas del día: solo tienen sentido si la persona asiste */
export function GuestQuestionFields({ prefix }: FieldsProps) {
  return (
    <div className="grid gap-x-6 md:grid-cols-2">
      <Form.Item
        className="md:col-span-2"
        label="¿Alguna alergia, intolerancia o dieta especial?"
        name={path(prefix, 'allergies')}
        rules={rules.optionalText(LIMITS.allergies)}
      >
        <Input
          placeholder="Ej.: celiaquía, vegetariano, frutos secos…"
          maxLength={LIMITS.allergies}
        />
      </Form.Item>

      <Form.Item
        label="¿Necesitas autobús?"
        name={path(prefix, 'needsBus')}
        rules={rules.requiredChoice('Dinos si necesitas autobús')}
      >
        <Radio.Group options={busOptions} />
      </Form.Item>

      <Form.Item
        label="Una canción que no puede faltar"
        name={path(prefix, 'favoriteSong')}
        rules={rules.optionalText(LIMITS.favoriteSong)}
      >
        <Input placeholder="Canción – artista" maxLength={LIMITS.favoriteSong} />
      </Form.Item>
    </div>
  )
}

/** Persona completa (nombre + preguntas): cada acompañante */
export function GuestFields({ prefix, autoFocus }: FieldsProps & { autoFocus?: boolean }) {
  return (
    <>
      <GuestNameFields prefix={prefix} autoFocus={autoFocus} />
      <GuestQuestionFields prefix={prefix} />
    </>
  )
}
