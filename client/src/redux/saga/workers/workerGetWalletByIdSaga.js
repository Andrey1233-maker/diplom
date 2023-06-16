// workerGetWalletByIdSaga

import { call, put } from "redux-saga/effects";
import {
  setAlertToUserReduxActionCreator, setWalletToReducerActionCreator,
} from "../../actions/actionCreators";
import { getWalletWithIdRequest } from "../../../api/requests/get";

export function* workerGetWalletByIdSaga(action) {
    try {
        const response = yield call(getWalletWithIdRequest, action)
        yield put(setWalletToReducerActionCreator(response.wallet, response.transfers))
    }
    catch(_) {
        yield put(
            setAlertToUserReduxActionCreator("Не удалось получить кошелёк", true)
          );
    }
}