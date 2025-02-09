
import Button from "./Button"
import { useNavigate } from "react-router-dom"

const User = ({user}:{ user:{firstName:string,lastName:string,email:string}}) => {

  const navigate = useNavigate()

  const handleSendMoney = ()=>{
    navigate(`/send?firstName=${user.firstName}&lastName=${user.lastName}&email=${user.email}`)
  }
  
  return (
    <div className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-lg shadow-md w-full sm:w-auto">
  {/* Profile Logo & Name Section */}
  <div className="flex items-center gap-3">
    {/* Profile Logo */}
    <div className="rounded-full h-12 w-12 text-center bg-slate-200 text-xl flex justify-center items-center">
      {user.firstName[0].toUpperCase()}
    </div>

    {/* Name & Email */}
    <div className="flex flex-col">
      <div className="font-semibold text-lg">{user.firstName} {user.lastName}</div>
      <div className="text-sm text-gray-600">{user.email}</div>
    </div>
  </div>

  {/* Send Money Button */}
  <Button onClick={handleSendMoney} label="Send Money"  />
</div>
  )
}

export default User
