import { SET_SOURCE } from "../action/types";

const initialUserState = {};

export default function (state = initialUserState, action) {
  switch (action.type) {
    case SET_SOURCE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
