import { Alert, Button, ConfigProvider, Form, Input } from 'antd'
import { darkSectionTheme } from '@/theme/antd'
import { RsvpFields } from './RsvpFields'
import type { RsvpFormValues } from './rsvp.schema'
import { RsvpSuccess } from './RsvpSuccess'
import { useRsvpSubmit } from './useRsvpSubmit'

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
        <RsvpFields autoFocus />

        {/* Honeypot: invisible para personas, irresistible para bots */}
        <Form.Item name="website" hidden>
          <Input tabIndex={-1} autoComplete="off" />
        </Form.Item>

        {attending !== undefined && (
          <>
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
          </>
        )}
      </Form>
    </ConfigProvider>
  )
}
