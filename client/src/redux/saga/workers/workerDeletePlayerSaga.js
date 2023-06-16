import { put, call } from "redux-saga/effects";
import deletePlayerRequest from "../../../api/requests/delete/deletePlayerRequest";
import { setAlertToUserReduxActionCreator, requestTableByIdActionCreator } from "../../actions/actionCreators";

export function* workerDeletePlayerSaga(action) {
    try {
        yield call(deletePlayerRequest, action)
        yield put(requestTableByIdActionCreator(action.tableId))
    }
    catch(e) {
        yield put(setAlertToUserReduxActionCreator('Не получилось удалить игрока', true))
    }
}