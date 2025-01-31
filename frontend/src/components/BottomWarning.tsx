import { Link } from "react-router-dom"

const BottomWarning = ({label,buttonText,link}:{label:string,buttonText:string,link:string}) => {
  return (
    <div className="text-sm py-1 flex justify-center ">
        <span className="">{label}</span>  
        <Link 
          to={link}
          className="cursor-pointer underline px-1 "
        >{buttonText}</Link>
    </div>
  )
}

export default BottomWarning
