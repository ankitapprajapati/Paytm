import { useState,useEffect } from "react"
import InputBox from "./InputBox"
import User from "./User"
import axios from "axios"

const Users = () => {
  const [filter,setFilter] = useState<string>("")
  const [users,setUsers] = useState<{firstName:string,lastName:string,email:string}[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect( ()=>{
    

    // for real world use debouncing
    const fetchUsers = async()=>{
      try{
        const response =await axios.get(`https://paytmapp-nm0r.onrender.com/api/v1/user/bulk?filter=${filter}`)
        setUsers(response.data.user)
        console.log(response.data.user)
        setLoading(true)
      }
      catch(e){
        alert("please refresh again...")
      }
    }
    fetchUsers();   
    
  },[filter])

  const handleFilterChange =async (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFilter(e.target.value)
  }
  return (
    <div className="flex flex-col mx-6 md:mx-10">
      <InputBox onChange={handleFilterChange} label="Users" placeholder="search friend's"/>

      {/* loading users----------- */}
      { !loading ? 
        <p text-center mt-4 text-gray-500>Loading Users......</p>
        :
        <div className="flex flex-col mt-4 gap-4">
          { users.length>0 && users.map( (user)=> <User user={user}/>)}
        </div>
      }
    </div>
  )
}

export default Users
