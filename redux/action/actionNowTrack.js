import { SET_NOW_TRACK } from "./types";

export function setNowTrack(track) {
  return {
    type: SET_NOW_TRACK,
    payload: track,
  };
}
