import { Form, Input, Radio } from 'antd'
import type { Tone } from '@/components/ui/tone'
import { CompanionsList } from './CompanionsList'
import { FormBlock } from './FormBlock'
import { GuestNameFields, GuestQuestionFields } from './GuestFields'
import { LIMITS, rules, type RsvpFormValues } from './rsvp.schema'

const attendanceOptions = [
  { label: 'Sí, allí estaré', value: true },
  { label: 'No podré ir', value: false },
]

type RsvpFieldsProps = { tone?: Tone; autoFocus?: boolean; primaryTitle?: string }

/** Campos de una respuesta: los usa el invitado (RSVP) y los novios al editar (/admin) */
export function RsvpFields({
  tone = 'dark',
  autoFocus,
  primaryTitle = 'Tus datos',
}: RsvpFieldsProps) {
  const form = Form.useFormInstance<RsvpFormValues>()
  const attending = Form.useWatch('attending', form)

  return (
    <>
      <FormBlock title={primaryTitle} tone={tone}>
        <GuestNameFields prefix={['primary']} autoFocus={autoFocus} />

        <Form.Item
          label="¿Vienes a la boda?"
          name="attending"
          rules={rules.requiredChoice('Cuéntanos si vienes')}
        >
          <Radio.Group
            block
            size="large"
            optionType="button"
            buttonStyle="solid"
            options={attendanceOptions}
          />
        </Form.Item>

        {attending === true && <GuestQuestionFields prefix={['primary']} />}
      </FormBlock>

      {attending === true && <CompanionsList tone={tone} />}

      {/* Hasta que no conteste si viene, el formulario no pasa de sus datos */}
      {attending !== undefined && (
        <Form.Item
          label="¿Algo que quieras decirnos?"
          name="message"
          rules={rules.optionalText(LIMITS.message)}
        >
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} maxLength={LIMITS.message} />
        </Form.Item>
      )}
    </>
  )
}
