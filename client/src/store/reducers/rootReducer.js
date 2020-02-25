import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import searchReducer from "./searchReducer";
import itinerariesReducer from "./itinerariesReducer";
import activitiesReducer from "./activitiesReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import commentsReducer from "./commentsReducer";

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: activitiesReducer,
  search: searchReducer,
  auth: authReducer,
  error: errorReducer,
  comments: commentsReducer
});
export default rootReducer;
