import { combineReducers } from "redux";
import user from "./userReducer";
import source from "./sourceReducer";

const rootReducer = combineReducers({
  user,
  source
});

export default rootReducer;
