
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import HomePage from './Containers/HomePage/HomePage';
import LoginPage from './Containers/LoginPage/LoginPage';
import Register from './Containers/RegisterPage/Register';
import PrivateRoute from './Components/PrivateRoute';
function App() {
  return (
    <div className="App">
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
