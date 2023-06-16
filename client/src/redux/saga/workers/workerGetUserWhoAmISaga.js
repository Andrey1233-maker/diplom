import { call, put } from "redux-saga/effects";

import { setToken } from "../../../readToken";
import { getUserWhoAmIRequest } from "../../../api";
import { setUserToUserReduceActionCreator } from "../../actions/actionCreators";

export function* workerGetUserWhoAmISaga() {
  try {
    const user = yield call(getUserWhoAmIRequest);
    yield put(setUserToUserReduceActionCreator(user));
  } catch (e) {
    // yield put(setAlertToUserReduxActionCreator('Ошибка при запросе данных о вас', true))
    console.log("Токен умер)))");
  }
}
