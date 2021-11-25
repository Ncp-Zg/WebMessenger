
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import HomePage from './Containers/HomePage/HomePage';
import LoginPage from './Containers/LoginPage/LoginPage';
import Register from './Containers/RegisterPage/Register';
import PrivateRoute from './Components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isloggedInUser } from './Redux/Actions';
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css"
// import { ToastContainer } from 'react-toastify';
function App() {
  const auth = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  useEffect(()=>{
      if(!auth.authenticated){
        dispatch(isloggedInUser())
      }
    },[])
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Switch>
          {/* only logged in user can access this home route */}
          <PrivateRoute exact path ="/" component={HomePage}/>
          <Route path ="/login" component={LoginPage}/>
          <Route path ="/signup" component={Register}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
