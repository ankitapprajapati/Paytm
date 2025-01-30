import { Link } from "react-router-dom"

const BottomWarning = ({label,buttonText,link}:{label:string,buttonText:string,link:string}) => {
  return (
    <div>
        <span>{label}</span>  
        <Link to={link} >{buttonText}</Link>
    </div>
  )
}

export default BottomWarning
