

import { BsFillSendFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom"

const User = ({user}:{ user:{firstName:string,lastName:string,email:string}}) => {

  const navigate = useNavigate()

  const handleSendMoney = ()=>{
    navigate(`/send?firstName=${user.firstName}&lastName=${user.lastName}&email=${user.email}`)
  }
  
  return (
    <div className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-lg shadow-md w-full sm:w-auto">
    <div className="flex items-center gap-3">
      {/* Profile Logo */}
      <div className="rounded-full h-12 w-12 text-center bg-slate-200 text-xl flex justify-center items-center font-semibold">
        {user.firstName[0].toUpperCase()}
      </div>
  
      {/* Name & Email (Stacked on Mobile, Inline on Desktop) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <div className="font-semibold text-gray-700 text-lg">{user.firstName} {user.lastName}</div>
        <div className="text-sm text-gray-600 sm:ml-2">{user.email}</div>
      </div>
    </div>
  
    
     {/* @ts-ignore */}
    <BsFillSendFill onClick={handleSendMoney} className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-900 hover:h-7 hover:w-7 transition duration-200" /> 
  </div>
  

  )
}

export default User
