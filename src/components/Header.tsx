import { Link } from "react-router-dom"

function header() {
  return (
    <header className="flex justify-between items-center h-16 bg-gray-100 px-5 shadow">
                <div className="absolute left-0 h-full flex items-center px-5 cursor-pointer">
                    <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" fill="none">
                        <path
                            fill="#0C1D2E"
                            fillRule="evenodd"
                            d="M7.707.293a1 1 0 0 1 0 1.414L2.414 7l5.293 5.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    </Link>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <span className="text-lg text-gray-800"></span>
                </div>
            </header>
  )
}

export default header