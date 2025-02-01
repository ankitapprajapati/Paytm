import { Link, useNavigate } from "react-router-dom"

import Button from "./Button"
import Profile from "./Profile"
import { useEffect, useState } from "react"
import axios from "axios"

const Appbar = () => {

    const navigate = useNavigate()
    const [user,setUser] = useState<{firstName:string,lastName:string,email:string} | null >(null)

    useEffect( ()=>{
        const getUserInfo = async()=>{
            try{
                const response = await axios.get("https://paytmapp-nm0r.onrender.com/api/v1/user/info",{
                    headers:{
                        authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                })  
                if( !response.data ){
                    alert("try again !!")
                    navigate("/signin")
                }
                console.log(response.data)
                console.log("appbar success")
                setUser(response.data) ; 
            }     
            catch(e){
                console.log("appbar error")
                alert("you are un-authorised")                
                navigate("/signin")
            }
        }
        getUserInfo();
    } ,[])
    

    const handleSignOut = async ()=>{
        localStorage.removeItem("token");
        navigate("/signin")
    }

  return (    
        <div className="flex justify-between items-center h-14 shadow  md:px-10 bg-pink-200">
            <Link to={"/dashboard"} >
                <div className="flex items-center justify-center h-full ml-4 font-semibold ">
                    PayTM App
                </div>
            </Link>
            <div className="flex items-center gap-2 ">
                <div className="flex flex-col items-center justify-center h-full mr-4">
                    <Button onClick={handleSignOut} label="sign out"/>
                </div>
                <div className="flex flex-col items-center justify-center h-full mr-4">
                    {user?.firstName}
                </div>  
                <Profile label={ user && user.firstName[0].toUpperCase() || "X"} />    
            </div>
        </div>
    
  )
}

export default Appbar
