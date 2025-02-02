
import axios from 'axios'
import React, { useState } from "react"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'



const Signup = () => {
  
  const isAuthenticated = useAuth()
  const navigate = useNavigate()
  if( isAuthenticated ){
    navigate("/dashboard");
  }

  const [firstName,setFirstName] = useState<string>("");
  const [lastName,setLastName] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");

  const handleFirstNameChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
    setFirstName(event.target.value)
  }
  const handleLastNameChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
    setLastName(event.target.value)
  }
  const handleEmailChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value)
  }

  const signupHandler = async ()=>{

    try{
      const response = await axios.post("https://paytmapp-nm0r.onrender.com/api/v1/user/signup",{
        firstName,
        lastName,
        email,
        password
      })
      alert(response.data.message);
      navigate("/signin")
    }
    catch(e:any ){
      alert(e.message)
    }
  }


  return (
    <div className="bg-slate-300 flex justify-center h-screen">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 h-max px-6 text-center ">
              <Heading label="Sign up"/> 
              <SubHeading label="Enter your information to create account"/>

              {/* -----firstname---- */}
              <InputBox  onChange={handleFirstNameChange} label="First Name"        placeholder="Ankit"      /> 
              <InputBox  onChange={handleLastNameChange}  label="Last Name"         placeholder="Prajapati" />
              <InputBox  onChange={handleEmailChange}     label="Email"             placeholder="ankit@gmail.com" />
              <InputBox  onChange={handlePasswordChange}   label="Password"         placeholder="*******" />
              <div className="mt-4"><Button label="signup" onClick={signupHandler}/> </div>
              <BottomWarning label="Already have an account? " link="/signin" buttonText="sign in "/>
            </div>
        </div>
    </div>
  )
}

export default Signup
