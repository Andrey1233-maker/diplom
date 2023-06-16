import { call, put } from "redux-saga/effects";
import {
  setAlertToUserReduxActionCreator,
  requestGetTablesActionCreator,
} from "../../actions/actionCreators";
import { postTableRequest } from "../../../api";

export function* workerPostTableSaga(action) {
  try {
    yield call(postTableRequest, action);
    yield put(requestGetTablesActionCreator());
    yield put(setAlertToUserReduxActionCreator("Комната создана", false));
  } catch (_) {
    yield put(
      setAlertToUserReduxActionCreator("Не удалось создать комнату", true)
    );
  }
}
