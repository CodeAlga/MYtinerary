import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import searchReducer from "./searchReducer";
const rootReducer = combineReducers({
  cities: citiesReducer,
  search: searchReducer
});
export default rootReducer;
