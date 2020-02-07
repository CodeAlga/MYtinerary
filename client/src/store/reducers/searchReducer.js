import { SEARCH } from "../actions/searchAction";

const initialState = { value: "" };

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH: {
      const { value } = action;
      console.log(value);

      return { ...state, value };
    }
    default:
      return state;
  }
}
