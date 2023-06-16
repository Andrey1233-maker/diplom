import { call, put } from "redux-saga/effects";
import {
    requestGetWalletsActionCreator,
  setAlertToUserReduxActionCreator,
} from "../../actions/actionCreators";
import { postWallet } from "../../../api/requests/post";



export function* workerPostWalletSaga(action) {
    try {
        const response = yield call(postWallet, action)
        yield put(requestGetWalletsActionCreator(action.playerId))
    }
    catch(_) {
        yield put(
            setAlertToUserReduxActionCreator("Не удалось получить ваши счета", true)
        );
    }
}