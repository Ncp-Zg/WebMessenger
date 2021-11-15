import {applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./Reducers/Reducer"


const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));


export default store;