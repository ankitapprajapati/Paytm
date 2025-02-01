import { Link, useNavigate } from "react-router-dom"

import Button from "./Button"
import Profile from "./Profile"

const Appbar = () => {

    const navigate = useNavigate()

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
                    Ankit
                </div>  
                <Profile label="A"  />    
            </div>
        </div>
    
  )
}

export default Appbar
