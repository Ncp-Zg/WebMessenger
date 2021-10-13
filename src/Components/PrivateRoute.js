import React from 'react'
import {Route,Redirect} from "react-router-dom"

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <div>
            <Route {...rest} component={(props)=>{
                const user = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null;
                if(user){
                        return <Component {...props}/>
                }else{
                        return <Redirect to={"/login"}/>
                }
            }}/>
        </div>
    )
}

export default PrivateRoute
