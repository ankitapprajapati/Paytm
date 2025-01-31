import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"


const Dashboard = () => {
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
