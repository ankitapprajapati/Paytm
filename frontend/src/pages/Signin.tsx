
import axios from 'axios'
import { useState } from "react"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")

  const handleEmailChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
      setEmail(event.target.value)
    }
    const handlePasswordChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
      setPassword(event.target.value)
    }
    const signinHandler = async ()=>{
      try{
        const response = await axios.post("https://paytmapp-nm0r.onrender.com/api/v1/user/signin",{
          email,
          password
        })
        localStorage.setItem("token",`${response.data.token}`)
        navigate("/dashboard")
      }
      catch(e){
        console.log(e)
        alert(e)
      }
    }
  return (
    <div className="flex justify-center h-screen bg-slate-300">
        <div className="flex flex-col justify-center">
          <div className="bg-white rounded-lg w-80 h-max px-6 text-center">
            <Heading label="Sign in"/> 
            <SubHeading label="Enter your credentials to access your account"/>
            <InputBox onChange={handleEmailChange}     label="Email"      placeholder="ankit@gmail.com" />
            <InputBox onChange={handlePasswordChange}  label="Password"   placeholder="*******" />
            <div className="mt-4"><Button onClick={signinHandler} label="Signin" /></div>
            <BottomWarning label="Not have an account? " link="/signup" buttonText="sign up "/>
          </div>
        </div>      
    </div>
  )
}

export default Signin
