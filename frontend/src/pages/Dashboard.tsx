import { useEffect } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const Dashboard = () => {

  const navigate = useNavigate()

  useEffect( ()=>{
    const userToken = localStorage.getItem("token");
    if( !userToken ){
      alert("you are authorized")
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
        if(response.data.message!=="authorised"){
          alert(response.data.message)
          navigate("/signin")
          return;
        }
      }
      catch(e){
        console.log("chud gayi")
        alert(e)
      }
    }
    tokenVerification();
    
  },[])

  return (
    <div className="bg-slate-300 h-screen ">
      <Appbar/>
      <div className=" mt-4">
        <Balance/>
        <Users/>
      </div>
    </div>
  )
}

export default Dashboard
