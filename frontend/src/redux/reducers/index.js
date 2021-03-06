import { combineReducers } from "redux";
import auth from "@reducers/auth";
import config from "@reducers/config";
import profile from "@reducers/profile";
import members from "@reducers/members";
import forum from "@reducers/forum";
import chat from "@reducers/chat";

const rootReducer = combineReducers({
  auth : auth,
  chat : chat,
  config : config,
  profile : profile,
  members : members,  
  forum : forum,
})

export default rootReducer
