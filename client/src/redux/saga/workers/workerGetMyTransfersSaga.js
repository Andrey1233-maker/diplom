import { put, call } from 'redux-saga/effects'
import { setAlertToUserReduxActionCreator, setMyTransfersToReduxActionCreator } from '../../actions/actionCreators'
import { getMyTransfersByTableRequest } from '../../../api/requests/get'

export function* workerGetMyTransfersSaga(action) {
    try {
        const response = yield call(getMyTransfersByTableRequest, action)
        yield put(setMyTransfersToReduxActionCreator(response))
    }
    catch {
        yield put(setAlertToUserReduxActionCreator('Не получилось получить переводы', true))
    }
}