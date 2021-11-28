import React, { useState } from 'react'
import "./RegisterComponent.css"

const RegisterComponent = (props) => {
    const [focused, setFocused] = useState(false);
    const{errorMessage,handlechange ,...rest} = props;
    return (
        <div className="form-floating mb-2">
            {/* <p>{rest.placeholder}</p> */}
                <input type="email" className="form-control" id={rest.name}
                {...rest}
                  onChange={(e)=>handlechange(e)}
                  onBlur={()=>setFocused(true)}
                  focused={focused.toString()}
                  onFocus={()=>rest.name === "confirmpassword" && setFocused(true)}
                />
                <label htmlFor={rest.name}>{rest.placeholder}</label>
                <span>{errorMessage}</span>
        </div>
    )
}

export default RegisterComponent
