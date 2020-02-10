import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import searchReducer from "./searchReducer";
import itinerariesReducer from "./itinerariesReducer";
const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  search: searchReducer
});
export default rootReducer;
