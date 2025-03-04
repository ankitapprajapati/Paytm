import { useEffect, useState } from "react" ;
import { useNavigate } from "react-router-dom";
import axios from "axios";


const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated]=useState<boolean>(false)
    const navigate = useNavigate();

    useEffect( ()=>{
        const userToken = localStorage.getItem("token");
        if( !userToken ){
          console.log("no token found")
          navigate("/signin");
          return;
        }
        //--------verify from backend, token from from bacend or not ------------
        const tokenVerification = async () => {
          try{
            const response = await axios.get("https://paytmapp-nm0r.onrender.com/api/v1/user/me",{
              headers:{
                authorization:"Bearer "+localStorage.getItem("token")
              }
            })
            if(response.data.message!=="authorized"){
              throw new Error("unauthorised access");
            }
            else{
                setIsAuthenticated(true)
            }
          }
          catch(e){
            console.log("unable to reach backend")
            navigate("/signin")
          }
        }
        tokenVerification(); 
      },[navigate])
    
    return isAuthenticated;
}

export default useAuth