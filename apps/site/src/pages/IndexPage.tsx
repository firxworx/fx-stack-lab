import { Link } from 'react-router-dom'

export function IndexPage(): JSX.Element {
  return (
    <>
      <h1 className="text-3xl mb-6">Index</h1>
      <div>
        This is the Index/Home page. <Link to="/about">Go to About Page.</Link>
      </div>
    </>
  )
}
