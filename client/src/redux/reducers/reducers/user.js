import {
  SET_ALERT_TO_USER_REDUCE_ACTION,
  SET_NOTIFICATIONS_TO_USER_REDUCE_ACTION,
  SET_USER_TO_USER_REDUCE_ACTION,
} from "../../actions/actionTypes";

const initialState = {
  user: null,
  notifications: [],
  alert: null,
  alertError: false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_TO_USER_REDUCE_ACTION:
      return { ...state, user: action.user };
    case SET_NOTIFICATIONS_TO_USER_REDUCE_ACTION:
      return { ...state, notifications: action.notifications };
    case SET_ALERT_TO_USER_REDUCE_ACTION:
      return { ...state, alert: action.content, alertError: action.error };
    default:
      return state;
  }
}
