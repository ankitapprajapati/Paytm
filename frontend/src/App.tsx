import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import PaymentStatus from './pages/PaymentStatus'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup'    element={<Signup/>}  />
          <Route path='/signin'    element={<Signin/>}  />
          <Route path='/dashboard' element={<Dashboard/>}  />
          <Route path='/send'      element={<SendMoney/>}  />
          <Route path='/status'    element={<PaymentStatus/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
