import { Link } from 'react-router-dom'

export interface NavMenuLink {
  title: string
  href: string
}

export interface NavLinkProps extends React.PropsWithChildren {
  to: string
}

export interface NavMenuProps {
  navLinks?: NavMenuLink[]
}

export function NavLink({ to, children }: NavLinkProps): JSX.Element {
  return (
    <Link to={to} className="inline-block p-4 hover:bg-slate-300 transition-colors duration-200">
      {children}
    </Link>
  )
}

export function NavMenu({ navLinks }: NavMenuProps): JSX.Element {
  return (
    <ul className="flex space-x-4" role="navigation">
      {navLinks?.map(({ title, href }) => (
        <li key={`${title}-${href}`}>
          <NavLink to={href}>{title}</NavLink>
        </li>
      ))}
    </ul>
  )
}
