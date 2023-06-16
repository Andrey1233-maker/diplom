import { call, put } from "redux-saga/effects";

import { deleteWalletRequest } from "../../../api/requests/delete";
import { requestGetWalletsActionCreator, setAlertToUserReduxActionCreator } from '../../actions/actionCreators'


export function* workerDeleteWalletSaga(action) {
    try {
        yield call(deleteWalletRequest, action)
        yield put(requestGetWalletsActionCreator(action.player))
    }
    catch(_) {
        yield put(
            setAlertToUserReduxActionCreator("Не удалось удалить счёт", true)
          );
    }
}