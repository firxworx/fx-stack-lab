import { Outlet } from 'react-router-dom'
import { NavMenu, type NavMenuLink } from './navigation/NavMenu'

export interface AppLayoutProps {
  navLinks?: NavMenuLink[]
}

export function AppLayout({ navLinks }: AppLayoutProps): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="px-2 sm:px-4 bg-slate-200">
        <NavMenu navLinks={navLinks} />
      </nav>
      <main className="flex flex-col flex-1 p-4 sm:p-8 bg-slate-50">
        <Outlet />
      </main>
    </div>
  )
}
