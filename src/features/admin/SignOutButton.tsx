import { Button } from 'antd'
import { signOut } from './admin.service'

export function SignOutButton() {
  return <Button onClick={() => void signOut()}>Cerrar sesión</Button>
}
