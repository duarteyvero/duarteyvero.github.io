import { Button, Popconfirm, Space } from 'antd'

type RsvpRowActionsProps = { onEdit: () => void; onDelete: () => Promise<void> }

export function RsvpRowActions({ onEdit, onDelete }: RsvpRowActionsProps) {
  return (
    <Space size={0}>
      <Button type="text" size="small" onClick={onEdit}>
        Editar
      </Button>
      <Popconfirm
        title="¿Borrar esta respuesta?"
        description="Se borrarán también sus acompañantes."
        okText="Borrar"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
        onConfirm={onDelete}
      >
        <Button type="text" danger size="small">
          Borrar
        </Button>
      </Popconfirm>
    </Space>
  )
}
