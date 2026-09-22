import { Alert, Button, ConfigProvider, Form, Input, Radio } from 'antd'
import { darkSectionTheme } from '@/theme/antd'
import { CompanionsList } from './CompanionsList'
import { FormBlock } from './FormBlock'
import { GuestNameFields, GuestQuestionFields } from './GuestFields'
import { LIMITS, rules, type RsvpFormValues } from './rsvp.schema'
import { RsvpSuccess } from './RsvpSuccess'
import { useRsvpSubmit } from './useRsvpSubmit'

const attendanceOptions = [
  { label: 'Sí, allí estaré', value: true },
  { label: 'No podré ir', value: false },
]

export function RsvpForm() {
  const [form] = Form.useForm<RsvpFormValues>()
  const attending = Form.useWatch('attending', form)
  const { status, error, submit, reset } = useRsvpSubmit()

  if (status === 'success') {
    return (
      <RsvpSuccess
        attending={form.getFieldValue('attending') === true}
        onAnother={() => {
          form.resetFields()
          reset()
        }}
      />
    )
  }

  return (
    <ConfigProvider theme={darkSectionTheme} variant="underlined">
      <Form<RsvpFormValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        scrollToFirstError={{ behavior: 'smooth', block: 'center' }}
        onFinish={submit}
        className="flex flex-col gap-10 text-left"
      >
        <FormBlock title="Tus datos">
          <GuestNameFields prefix={['primary']} />

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

        {attending === true && <CompanionsList />}

        <Form.Item
          label="¿Algo que quieras decirnos?"
          name="message"
          rules={rules.optionalText(LIMITS.message)}
        >
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} maxLength={LIMITS.message} />
        </Form.Item>

        {/* Honeypot: invisible para personas, irresistible para bots */}
        <Form.Item name="website" hidden>
          <Input tabIndex={-1} autoComplete="off" />
        </Form.Item>

        {error && <Alert type="error" showIcon title={error} />}

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={status === 'submitting'}
          className="h-14 text-[11px] tracking-[.25em] uppercase"
        >
          Enviar respuesta
        </Button>
      </Form>
    </ConfigProvider>
  )
}
