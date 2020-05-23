import axios from "axios";

export const GET_ITEM_LIST = "GET_ITEM_LIST";

export const getItemList = () => {
  return (dispatch) => {
    return axios.get("https://exam.freshcode.me/front/salads").then((res) => {
      dispatch({ type: "GET_ITEM_LIST", payload: res.data.menus });
    });
  };
};
