import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import useAuth from "../hooks/useAuth"


const Dashboard = () => {

  const isAuthorized : boolean = useAuth();

  return (
    isAuthorized &&
    <div className="bg-slate-300 h-screen flex flex-col ">
      <Appbar/>
      <div className="flex flex-col items-center  justify-center mt-4 sm:px-8 md:px-16 lg:px-32 w-full ">
        <div className="w-full max-w-screen-lg"> 
          <Balance/>
          <Users/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
