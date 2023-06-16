import { call, put } from "redux-saga/effects";
import {
  setAlertToUserReduxActionCreator, setWalletsToReducerActionCreator,
} from "../../actions/actionCreators";
import { getWalletsByTableRequest } from "../../../api";

export function* workerGetWalletsByTableSaga(action) {
    try {
        const wallets = yield call(getWalletsByTableRequest, action)
        yield put(setWalletsToReducerActionCreator(wallets))
    }
    catch(_) {
        yield put(
            setAlertToUserReduxActionCreator("Не удалось получить ваши счета", true)
          );
    }
}