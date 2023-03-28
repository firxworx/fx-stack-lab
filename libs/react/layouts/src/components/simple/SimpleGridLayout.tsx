export interface SimpleGridLayoutProps extends React.PropsWithChildren {
  Header: React.ReactNode
  Footer: React.ReactNode
}

const sectionParentClassName = 'mx-auto max-w-7xl px-8'

export function SimpleGridLayout({ Header, Footer, children }: SimpleGridLayoutProps): JSX.Element {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
      <header className="bg-gray-800 text-white py-4">
        <div className={sectionParentClassName}>{Header}</div>
      </header>
      <main className="p-8">
        <div className={sectionParentClassName}>{children}</div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className={sectionParentClassName}>{Footer}</div>
      </footer>
    </div>
  )
}
