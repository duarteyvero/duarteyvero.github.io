import { Alert, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { RsvpFields } from '@/features/rsvp/RsvpFields'
import { rules } from '@/features/rsvp/rsvp.schema'
import { ADMIN_NOTE_MAX, type AdminRsvpValues, type RsvpWithGuests } from './admin.service'
import { fullName, primaryGuest } from './rsvp.stats'
import { toFormValues } from './toFormValues'

type RsvpModalProps = {
  open: boolean
  /** Respuesta a editar; sin ella, el modal crea una nueva */
  rsvp?: RsvpWithGuests
  onSave: (values: AdminRsvpValues) => Promise<void>
  onClose: () => void
}

/** Mismo formulario que el RSVP público + nota privada, en el tema claro del panel */
export function RsvpModal({ open, rsvp, onSave, onClose }: RsvpModalProps) {
  const [form] = Form.useForm<AdminRsvpValues>()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()
  const primary = rsvp && primaryGuest(rsvp)

  const handleFinish = async (values: AdminRsvpValues) => {
    setSaving(true)
    setError(undefined)

    try {
      await onSave(values)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      title={rsvp ? `Editar respuesta de ${primary ? fullName(primary) : '—'}` : 'Nueva respuesta'}
      okText={rsvp ? 'Guardar cambios' : 'Añadir respuesta'}
      cancelText="Cancelar"
      confirmLoading={saving}
      onOk={() => form.submit()}
      onCancel={onClose}
      afterClose={() => setError(undefined)}
      destroyOnHidden
      width={720}
    >
      {open && (
        <Form<AdminRsvpValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={rsvp && toFormValues(rsvp)}
          scrollToFirstError={{ behavior: 'smooth', block: 'center' }}
          onFinish={handleFinish}
          className="flex flex-col gap-6 pt-2"
        >
          <RsvpFields tone="light" primaryTitle="Titular" autoFocus={!rsvp} />

          <Form.Item
            label="Nota privada (solo la veis vosotros)"
            name="adminNote"
            rules={rules.optionalText(ADMIN_NOTE_MAX)}
          >
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 5 }}
              maxLength={ADMIN_NOTE_MAX}
              placeholder="Ej.: primo de Vero, confirmado por WhatsApp, mesa 4…"
            />
          </Form.Item>

          {error && <Alert type="error" showIcon title={error} />}
        </Form>
      )}
    </Modal>
  )
}
