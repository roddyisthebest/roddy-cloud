import { SET_USER, CLEAR_USER } from "./types";

export function setUser(user) {
  return {
    type: SET_USER,
    payload: JSON.parse(JSON.stringify(user)),
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
  };
}

export function setPhotoURL(photoURL) {
  return {
    type: SET_PHOTO_URL,
    payload: photoURL,
  };
}
