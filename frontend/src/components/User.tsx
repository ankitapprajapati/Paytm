
import Button from "./Button"
import { useNavigate } from "react-router-dom"

const User = ({user}:{ user:{firstName:string,lastName:string,email:string}}) => {

  const navigate = useNavigate()

  const handleSendMoney = ()=>{
    navigate(`/send?firstName=${user.firstName}&lastName=${user.lastName}&email=${user.email}`)
  }
  
  return (
    <div className="flex flex-row items-center justify-between h-10 bg-slate-100 px-6  rounded-lg">
        <div className="flex flex-row item-center justify-center gap-2">
            <div className="rounded-full h-6 w-6 text-center bg-slate-200 text-xl flex justify-center items-center" >{user.firstName[0].toUpperCase()} </div>
            <div className="flex flex-row gap-1">
                <div className=" ">{user.firstName}</div> 
                <div>{user.lastName}</div>
            </div>
        </div>
        <div>{user.email}</div>
        <div className="flex h-full justify-center items-center">
            <Button onClick={handleSendMoney} label="Send Money"/>
        </div>
    </div>
  )
}

export default User
