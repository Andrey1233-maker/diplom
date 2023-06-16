import { put, call } from "redux-saga/effects";
import { postInviteUserToTableRequest } from "../../../api/requests/post";
import { requestTableByIdActionCreator, setAlertToUserReduxActionCreator } from "../../actions/actionCreators";


export function* workerPostAddUserToTableSaga(action) {
    try {
        yield call(postInviteUserToTableRequest, action)
        yield put(requestTableByIdActionCreator(action.tableId))
    }
    catch(e) {
        yield put(setAlertToUserReduxActionCreator('Не получилось добавить пользователя в комнату, проверьте правильность введёной почты', true))
    }
}