
import { useSearchParams,useNavigate } from "react-router-dom"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import { useState } from "react"
import axios from "axios"
import useAuth from "../hooks/useAuth"

const SendMoney = () => {

  useAuth()

  const navigate = useNavigate()

  const [amount,setAmount]=useState<number>();
  const [searchParams] = useSearchParams();
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const email = searchParams.get("email");

  const handleAmount = ( event: React.ChangeEvent<HTMLInputElement>)=>{
    setAmount(parseInt(event.target.value));
  }

  // --------transfer--------
  const handleTransfer = async()=>{
    try{
      console.log(amount)
      const response = await axios.post("https://paytmapp-nm0r.onrender.com/api/v1/account/transfer",{
        to:`${email}`,
        amount
      },{
        headers:{
          "authorization": "Bearer "+localStorage.getItem("token")
        }
      })
      alert(response.data.message)
      navigate("/dashboard")
    }
    catch(e:any){
      alert(e.message)
    }
  }

  return (
    <div className="flex h-screen bg-slate-300 justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg w-80 h-max px-6 text-center">
          <Heading label="Send Money"/>
          <div className="flex flex-row item-center justify-left gap-2">
            <div className="rounded-full h-6 w-6 text-center bg-green-600 text-white text-xl flex justify-center items-center" > { firstName && firstName[0].toUpperCase() }</div>
            <div className="flex flex-row gap-1 font-semibold">
                <div>{firstName}</div> 
                <div>{lastName}</div>
            </div>
          </div>
          <InputBox onChange={handleAmount} label="Amount ( in rs )" placeholder="Enter Amount"></InputBox>
          <div>
            <button
              onClick={handleTransfer} 
              className="font-medium bg-green-600 text-white w-full  my-6 rounded-lg">
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendMoney
