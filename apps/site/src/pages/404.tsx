import { Link } from 'react-router-dom'

export function NotFoundPage(): JSX.Element {
  return (
    <>
      <h1 className="text-3xl mb-6">Not Found</h1>
      <div>
        Not Found. <Link to="/">Go to Home</Link>
      </div>
    </>
  )
}
