import { Alert, Button, Form, Input } from 'antd'
import { useState } from 'react'
import { Heading } from '@/components/ui/Heading'
import { Kicker } from '@/components/ui/Kicker'
import { signIn } from './admin.service'

type Credentials = { email: string; password: string }

export function LoginForm() {
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const onFinish = async ({ email, password }: Credentials) => {
    setLoading(true)
    setError(undefined)
    try {
      await signIn(email, password)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-[400px] py-10">
      <Kicker>Solo para los novios</Kicker>
      <Heading lines="Entrar." size="md" className="mb-8" />

      <Form<Credentials> layout="vertical" requiredMark={false} onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Introduce un email válido' }]}
        >
          <Input size="large" autoComplete="email" autoFocus />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Introduce la contraseña' }]}
        >
          <Input.Password size="large" autoComplete="current-password" />
        </Form.Item>

        {error && <Alert type="error" showIcon title={error} className="mb-6" />}

        <Button type="primary" htmlType="submit" size="large" block loading={loading}>
          Entrar
        </Button>
      </Form>
    </div>
  )
}
