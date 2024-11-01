import { combineReducers } from "redux";
import authReducer from './adminSlice';
const rootReducer = combineReducers({
  admin: authReducer,
});
export default rootReducer;