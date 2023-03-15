import { Link } from 'react-router-dom'

export function AboutPage(): JSX.Element {
  return (
    <>
      <h1 className="text-3xl mb-6">About</h1>
      <div>
        This is the About page. <Link to="/">Go to Home Page.</Link>
      </div>
    </>
  )
}
