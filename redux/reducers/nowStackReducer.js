import { SET_NOW_TRACK } from "../action/types";

const initialUserState = {};

export default function (state = initialUserState, action) {
  switch (action.type) {
    case SET_NOW_TRACK:
      return { ...state, nowStack: action.payload };
    default:
      return state;
  }
}
