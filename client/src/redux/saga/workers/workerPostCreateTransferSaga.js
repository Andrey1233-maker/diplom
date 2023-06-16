import { put, call } from "redux-saga/effects";
import { setAlertToUserReduxActionCreator, requestTableByIdActionCreator, requestGetWalletsActionCreator } from "../../actions/actionCreators";
import postCreateTransferRequest from '../../../api/requests/post/postCreateTransferRequest'


export function* workerPostCreateTransferSaga(action) {
    try {
        yield call(postCreateTransferRequest, action)
        yield put(requestTableByIdActionCreator(action.tableId))
        yield put(requestGetWalletsActionCreator(action.playerId))
    }
    catch(e) {
        yield put(setAlertToUserReduxActionCreator('Перевод не получился', true))
    }
}