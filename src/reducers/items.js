import { GET_ITEM_LIST } from "../actions/item";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ITEM_LIST:
      return action.payload;
    default:
      return state;
  }
}
