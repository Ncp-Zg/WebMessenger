import React, { useState } from 'react'
import "./RegisterComponent.css"

const RegisterComponent = (props) => {
    const [focused, setFocused] = useState(false);
    const{errorMessage, ...rest} = props;
    return (
        <div style={{}}>
            <p>{rest.placeholder}</p>
                <input
                {...rest}
                  onChange={(e)=>props.handleChange(e)}
                  onBlur={()=>setFocused(true)}
                  focused={focused.toString()}
                  onFocus={()=>rest.name === "confirmpassword" && setFocused(true)}
                />
                <span>{errorMessage}</span>
        </div>
    )
}

export default RegisterComponent
