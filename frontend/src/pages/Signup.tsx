import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"

const Signup = () => {
  return (
    <div>
        <div>
            <Heading label="Sign up"/> 
            <InputBox label="First Name" placeholder="Ankit" /> 
            <InputBox label="Last Name"  placeholder="Prajapati" />
            <InputBox label="Email"      placeholder="ankit@gmail.com" />
            <InputBox label="Password"   placeholder="*******" />
            <Button label="signup" />
            <BottomWarning label="Already have an account? " link="/signin" buttonText="sign in "/>
        </div>
    </div>
  )
}

export default Signup
