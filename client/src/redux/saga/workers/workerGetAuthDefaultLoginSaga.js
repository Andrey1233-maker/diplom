import { call, put } from "redux-saga/effects";
import { getAuthDefaultLoginRequest } from "../../../api";
import { setToken } from "../../../readToken";
import {
  setAlertToUserReduxActionCreator,
  requestGetUserWhoAmIActionCreator,
} from "../../actions/actionCreators";

export function* workerGetAuthDefaultLoginSaga(action) {
  try {
    const token = yield call(getAuthDefaultLoginRequest, action);
    yield console.log(token);
    yield setToken(token.token);
    yield put(requestGetUserWhoAmIActionCreator());
  } catch (e) {
    yield put(setAlertToUserReduxActionCreator("Нужно авторизоваться", true));
  }
}
