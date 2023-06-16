import { put, call } from 'redux-saga/effects'
import { setAlertToUserReduxActionCreator, setAllTransfersToReduxActionCreator } from '../../actions/actionCreators'
import { getAllTransfersByTableRequest } from '../../../api/requests/get'

export function* workerGetAllTransfersSaga(action) {
    try {
        const response = yield call(getAllTransfersByTableRequest, action)
        yield put(setAllTransfersToReduxActionCreator(response))
    }
    catch {
        yield put(setAlertToUserReduxActionCreator('Не получилось получить переводы', true))
    }
}