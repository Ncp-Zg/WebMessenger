import React, { useState } from 'react'
import "./RegisterComponent.css"

const RegisterComponent = (props) => {
    const [focused, setFocused] = useState(false);
    const{errorMessage, ...rest} = props;
    return (
        <div className="form-floating mb-3">
            {/* <p>{rest.placeholder}</p> */}
                <input type="email" className="form-control" id="floatingInput"
                {...rest}
                  onChange={(e)=>props.handleChange(e)}
                  onBlur={()=>setFocused(true)}
                  focused={focused.toString()}
                  onFocus={()=>rest.name === "confirmpassword" && setFocused(true)}
                />
                <label for="floatingInput">{rest.placeholder}</label>
                <span>{errorMessage}</span>
        </div>
    )
}

export default RegisterComponent
