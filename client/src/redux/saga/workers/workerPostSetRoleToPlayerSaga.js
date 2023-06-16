import { put, call } from "redux-saga/effects";
import { setAlertToUserReduxActionCreator, requestTableByIdActionCreator } from "../../actions/actionCreators";
import postPlayerRoleRequest from "../../../api/requests/post/postPlayerRoleRequest";

export function* workerPostSetRoleToPlayerSaga(action) {
    try {
        yield call(postPlayerRoleRequest, action)
        yield put(requestTableByIdActionCreator(action.tableId))
    }
    catch(e) {
        yield put(setAlertToUserReduxActionCreator('Не получилось дать роль игроку', true))
    }
}