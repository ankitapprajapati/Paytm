import axios from "axios";
import { useEffect,useState } from "react"


const Balance = () => {

  const [balance,setBalance] = useState<number>(0);

  useEffect( ()=>{
    const getBalance = async () => {
      try{
        const response = await axios.get("https://paytmapp-nm0r.onrender.com/api/v1/account/balance",{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        setBalance(response.data.balance)
      }
      catch(e){
        console.log("can not get balance : "+e)
      }
    }
    getBalance()
  },[])

  return (
    <div className="flex px-4 md:px-10  ">
        <div className="font-semibold text-md "> Your Balance {""} </div>
        <div className="font-semibold text-md ml-3" >{balance.toString()}</div>      
    </div>
  )
}

export default Balance
