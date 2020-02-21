import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import searchReducer from "./searchReducer";
import itinerariesReducer from "./itinerariesReducer";
import activitiesReducer from "./activitiesReducer";
import usersReducer from "./userReducer";
import loginReducer from "./loginReducer";
import authReducer from "./authReducer";
const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: activitiesReducer,
  users: usersReducer,
  login: loginReducer,
  search: searchReducer,
  auth: authReducer
});
export default rootReducer;
