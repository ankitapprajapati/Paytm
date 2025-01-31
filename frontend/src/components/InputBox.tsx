

const InputBox = ({ label,placeholder,onChange} : {label:string,placeholder:string,onChange:(event: React.ChangeEvent<HTMLInputElement>)=> void}) => {
  return (
    <div>
        <div className="text-sm font-medium text-left py-2">{label}</div>  
        <div className="">
            <input 
              onChange={onChange}
              className="w-full px-2 py-1 border rounded border-slate-200"
              type="text" 
              placeholder={placeholder} 
            />   
        </div> 
    </div>
  )
}

export default InputBox
