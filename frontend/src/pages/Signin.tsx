import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"

const Signin = () => {
  return (
    <div>
        <div>
            <Heading label="Sign in"/> 
            <InputBox label="Email"      placeholder="ankit@gmail.com" />
            <InputBox label="Password"   placeholder="*******" />
            <Button label="signup" />
            <BottomWarning label="Not have an account? " link="/signup" buttonText="sign up "/>
        </div>      
    </div>
  )
}

export default Signin
