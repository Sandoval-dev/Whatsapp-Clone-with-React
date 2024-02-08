import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';  // Note the correct import of `redux-thunk`
import { userReducer } from "./reducers/userReducer";

const initialState = {

}

const reducers = combineReducers({
    user : userReducer
})

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store;
