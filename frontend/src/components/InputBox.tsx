

const InputBox = ({ label,placeholder} : {label:string,placeholder:string}) => {
  return (
    <div>
        <div>{label}</div>  
        <div>
            <input type="text" placeholder={placeholder} />   
        </div> 
    </div>
  )
}

export default InputBox
