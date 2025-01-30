
const Button = ({label}:{label:string}) => {
  return (
    <div>
        <button type="button" className="px-5 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            {label}
        </button>       
    </div>
  )
}

export default Button
