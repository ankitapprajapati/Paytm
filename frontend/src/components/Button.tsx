
const Button = ({label,onClick}:{label:string,onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void}) => {
  return (
    <div>
        <button onClick={onClick} type="button" className="w-full bg-gray-600 hover:bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg px-2 py-1 ">
            {label}
        </button>       
    </div>
  )
}

export default Button
