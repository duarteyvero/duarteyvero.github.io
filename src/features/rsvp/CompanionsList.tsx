import { Button, Form } from 'antd'
import { useState } from 'react'
import { FormBlock } from './FormBlock'
import { GuestFields } from './GuestFields'
import { LIMITS } from './rsvp.schema'

export function CompanionsList() {
  // autoFocus solo actúa al montar: así el foco va únicamente al acompañante recién añadido
  const [hasAdded, setHasAdded] = useState(false)

  return (
    <Form.List name="companions">
      {(fields, { add, remove }) => (
        <div className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <FormBlock
              key={field.key}
              title={`Acompañante ${index + 1}`}
              action={
                <Button
                  type="text"
                  size="small"
                  onClick={() => remove(field.name)}
                  aria-label={`Quitar acompañante ${index + 1}`}
                >
                  Quitar
                </Button>
              }
            >
              <GuestFields
                prefix={[field.name]}
                autoFocus={hasAdded && index === fields.length - 1}
              />
            </FormBlock>
          ))}

          {fields.length < LIMITS.companions ? (
            <Button
              block
              type="dashed"
              size="large"
              onClick={() => {
                add()
                setHasAdded(true)
              }}
            >
              + Añadir acompañante
            </Button>
          ) : (
            <p className="text-center text-sm text-mist">
              Has llegado al máximo de {LIMITS.companions} acompañantes.
            </p>
          )}
        </div>
      )}
    </Form.List>
  )
}
