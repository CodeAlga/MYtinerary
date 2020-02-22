import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import searchReducer from "./searchReducer";
import itinerariesReducer from "./itinerariesReducer";
import activitiesReducer from "./activitiesReducer";
import usersReducer from "./userReducer";
//import loginReducer from "./loginReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: activitiesReducer,
  users: usersReducer,
  //login: loginReducer,
  search: searchReducer,
  auth: authReducer,
  error: errorReducer
});
export default rootReducer;
