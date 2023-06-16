import { call, put } from "redux-saga/effects";
import { postAuthDefaultRegReuest } from "../../../api";
import { setAlertToUserReduxActionCreator } from "../../actions/actionCreators";

export function* workerPostAuthDefaultRegSaga(action) {
  try {
    yield call(postAuthDefaultRegReuest, action);
    yield put(
      setAlertToUserReduxActionCreator(
        "Для подтверждения регистрации перейдите по ссылке в письме",
        false
      )
    );
  } catch (e) {
    yield put(
      setAlertToUserReduxActionCreator("Ошибка при запросе данных о вас", true)
    );
  }
}
