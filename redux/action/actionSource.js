import { SET_SOURCE } from "./types";

export function setSource(source) {
  return {
    type: SET_SOURCE,
    payload: JSON.parse(JSON.stringify(source)),
  };
}
