 
import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-2">Oops! Page not found.</p>
      <Link to="/dashboard" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Go Home
      </Link>
    </div>
  )
}

export default PageNotFound
