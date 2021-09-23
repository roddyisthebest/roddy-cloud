import {
  SET_USER,
  CLEAR_USER,
  SET_PHOTO_URL,
  SET_SELETED_USER,
} from "../action/types";

const initialUserState = {
  currentUser: null,
  isLoading: true,
  seletedUser: null,
};

export default function (state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.payload, isLoading: false };

    case CLEAR_USER:
      return { ...state, currentUser: null, isLoading: false };
    case SET_PHOTO_URL:
      return {
        ...state,
        currentUser: { ...state.currentUser, SET_PHOTO_URL: action.payload },
        isLoading: false,
      };

    case SET_SELETED_USER:
      return {
        ...state,
        seletedUser: action.payload,
      };
    default:
      return state;
  }
}
