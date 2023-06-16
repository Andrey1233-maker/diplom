import { SET_TABLES_TO_TABLES_REDUCER_ACTION } from "../../actions/actionTypes";

const initialState = {
  tables: [],
};

export function tableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TABLES_TO_TABLES_REDUCER_ACTION:
      return { ...state, tables: action.tables };
    default:
      return state;
  }
}
