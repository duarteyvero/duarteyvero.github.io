import { Alert, Form, Modal } from 'antd'
import { useState } from 'react'
import { RsvpFields } from '@/features/rsvp/RsvpFields'
import type { RsvpFormValues } from '@/features/rsvp/rsvp.schema'
import type { RsvpWithGuests } from './admin.service'
import { fullName, primaryGuest } from './rsvp.stats'
import { toFormValues } from './toFormValues'

type RsvpEditModalProps = {
  /** Respuesta en edición; `undefined` = modal cerrado */
  rsvp?: RsvpWithGuests
  onSave: (id: string, values: RsvpFormValues) => Promise<void>
  onClose: () => void
}

/** Mismo formulario que el RSVP público, relleno con la respuesta y en el tema claro del panel */
export function RsvpEditModal({ rsvp, onSave, onClose }: RsvpEditModalProps) {
  const [form] = Form.useForm<RsvpFormValues>()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()
  const primary = rsvp && primaryGuest(rsvp)

  const handleFinish = async (values: RsvpFormValues) => {
    if (!rsvp) return
    setSaving(true)
    setError(undefined)

    try {
      await onSave(rsvp.id, values)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={rsvp !== undefined}
      title={primary ? `Editar respuesta de ${fullName(primary)}` : 'Editar respuesta'}
      okText="Guardar cambios"
      cancelText="Cancelar"
      confirmLoading={saving}
      onOk={() => form.submit()}
      onCancel={onClose}
      afterClose={() => setError(undefined)}
      destroyOnHidden
      width={720}
    >
      {rsvp && (
        <Form<RsvpFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={toFormValues(rsvp)}
          scrollToFirstError={{ behavior: 'smooth', block: 'center' }}
          onFinish={handleFinish}
          className="flex flex-col gap-6 pt-2"
        >
          <RsvpFields tone="light" primaryTitle="Titular" />
          {error && <Alert type="error" showIcon title={error} />}
        </Form>
      )}
    </Modal>
  )
}
