import { combineReducers } from "redux";
import user from "./userReducer";
import source from "./sourceReducer";
import nowStack from "./nowStackReducer";
const rootReducer = combineReducers({
  user,
  source,
  nowStack,
});

export default rootReducer;
