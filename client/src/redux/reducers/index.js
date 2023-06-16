import { combineReducers } from "redux";

import { userReducer } from "./reducers/user";
import { tableReducer } from "./reducers/tables";
import tableInfoReducer from "./reducers/table"

export default combineReducers({
  userReducer,
  tableReducer,
  tableInfoReducer,
});
