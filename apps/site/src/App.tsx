import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import type { NavMenuLink } from './layout/navigation/NavMenu'

import { IndexPage } from './pages/IndexPage'
import { NotFoundPage } from './pages/404'
import { AboutPage } from './pages/AboutPage'
import { FormPage } from './pages/FormPage'
import { MantinePage } from './pages/MantinePage'

const navLinks: NavMenuLink[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Form',
    href: '/form',
  },
  {
    title: 'Mantine',
    href: '/mantine',
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
        <Route path="form" element={<FormPage />} />
        <Route path="form/:step" element={<FormPage />} />
        {/* <Route path="form/:id" element={<FormPage />} /> */}
        <Route path="mantine" element={<MantinePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
