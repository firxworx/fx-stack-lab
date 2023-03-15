import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import type { NavMenuLink } from './layout/navigation/NavMenu'

import { IndexPage } from './pages/IndexPage'
import { NotFoundPage } from './pages/404'

const navLinks: NavMenuLink[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
]

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<AppLayout navLinks={navLinks} />}>
        <Route index element={<IndexPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
