import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import useAuth from "../hooks/useAuth"


const Dashboard = () => {

  const isAuthorized : boolean = useAuth();

  return (
    isAuthorized &&
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
