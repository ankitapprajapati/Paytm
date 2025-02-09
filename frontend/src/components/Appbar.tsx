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
                    throw new Error("unauthorised")
                    navigate("/signin")
                }
                setUser(response.data.user) ; 
            }     
            catch(e){     
                console.log("can not get user detial : "+e)          
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
        <div className="flex justify-between items-center h-14 shadow-md px-4 md:px-10 bg-pink-200">
            <Link to={"/dashboard"} >
                <div className="flex items-center justify-center h-full  font-semibold text-lg md:text-xl">
                    PayTM App
                </div>
            </Link>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
                
                <Button onClick={handleSignOut} label="sign out"/>
                <div className=" hidden sm:block font-medium">
                    {user?.firstName}
                </div>  
                <Profile label={ user?.firstName?.charAt(0)?.toUpperCase() || " "} />    
            </div>
        </div>
    
  )
}

export default Appbar
