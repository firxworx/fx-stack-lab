import { SimpleGridLayout } from '@firx/react-layouts'
import { Outlet } from 'react-router-dom'

export interface AppLayoutProps {
  // navLinks?: NavMenuLink[]
}

export function AppLayout(): JSX.Element {
  return (
    <SimpleGridLayout Header={<>Header</>} Footer={<>Footer</>}>
      <Outlet />
    </SimpleGridLayout>
  )
}
