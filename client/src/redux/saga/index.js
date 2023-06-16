import { all, takeEvery } from "redux-saga/effects";
import {
  REQUEST_POST_TABLE_ACTION,
  REQUEST_GET_NOTIFICATIONS_ACTION,
  REQUEST_GET_AUTH_DAFAULT_LOGIN_ACTION,
  REQUEST_GET_USER_WHO_AM_I_ACTION,
  REQUEST_POST_AUTH_DEFAULT_REG_ACTION,
  REQUEST_DELETE_NOTIFICATION_ACTION,
  REQUEST_GET_TABLES_ACTION,
  REQUEST_TABLE_BY_ID_ACTION,
  REQUEST_GET_WALLETS_ACTION,
  REQUEST_POST_WALLETS_ACTION,
  REQUEST_DELETE_WALLETS_ACTION,
  REQUEST_GET_ALL_TRANSFERS_ACTION,
  REQUEST_GET_MY_TRANSFERS_ACTION,
  REQUEST_POST_ADD_USER_TO_TABLE_ACTION,
  REQUEST_DELETE_PLAYER_ACTION,
  REQUEST_POST_ROLE_PLAYER_ACTION,
  REQUEST_POST_CREATE_TRANSFER_ACTION,
  REQUEST_WALLET_ACTION,
} from "../actions/actionTypes";
import { workerGetAuthDefaultLoginSaga } from "./workers/workerGetAuthDefaultLoginSaga";
import { workerGetUserWhoAmISaga } from "./workers/workerGetUserWhoAmISaga";
import { workerPostAuthDefaultRegSaga } from "./workers/workerPostAuthDefaultRegSaga";
import { workerGetNotificationsSaga } from "./workers/workerGetNotificationsSaga";
import { workerDeleteNotificationSaga } from "./workers/workerDeleteNotificationSaga";
import { workerGetTablesSaga } from "./workers/workerGetTablesSaga";
import { workerPostTableSaga } from "./workers/workerPostTableSaga";
import { workerGetTableByIdSaga } from './workers/workerGetTableByIdSaga';
import {workerGetWalletsByTableSaga } from './workers/workerGetWalletsByTableSaga'
import { workerPostWalletSaga } from './workers/workerPostWalletSaga'
import {  workerDeleteWalletSaga } from './workers/workerDeleteWalletSaga'
import { workerGetAllTransfersSaga } from './workers/workerGetAllTransfersSaga'
import { workerGetMyTransfersSaga } from './workers/workerGetMyTransfersSaga'
import { workerPostAddUserToTableSaga } from "./workers/workerPostAddUserToTableSaga";
import { workerDeletePlayerSaga } from "./workers/workerDeletePlayerSaga";
import { workerPostSetRoleToPlayerSaga } from "./workers/workerPostSetRoleToPlayerSaga";
import { workerPostCreateTransferSaga } from "./workers/workerPostCreateTransferSaga";
import { workerGetWalletByIdSaga } from "./workers/workerGetWalletByIdSaga";

export function* saga() {
  yield all([
    takeEvery(
      REQUEST_GET_AUTH_DAFAULT_LOGIN_ACTION,
      workerGetAuthDefaultLoginSaga
    ),
    takeEvery(
      REQUEST_POST_AUTH_DEFAULT_REG_ACTION,
      workerPostAuthDefaultRegSaga
    ),
    takeEvery(REQUEST_GET_USER_WHO_AM_I_ACTION, workerGetUserWhoAmISaga),
    takeEvery(REQUEST_GET_NOTIFICATIONS_ACTION, workerGetNotificationsSaga),
    takeEvery(REQUEST_DELETE_NOTIFICATION_ACTION, workerDeleteNotificationSaga),
    takeEvery(REQUEST_GET_TABLES_ACTION, workerGetTablesSaga),
    takeEvery(REQUEST_POST_TABLE_ACTION, workerPostTableSaga),
    takeEvery(REQUEST_TABLE_BY_ID_ACTION, workerGetTableByIdSaga),
    takeEvery(REQUEST_GET_WALLETS_ACTION, workerGetWalletsByTableSaga),
    takeEvery(REQUEST_POST_WALLETS_ACTION, workerPostWalletSaga),
    takeEvery(REQUEST_DELETE_WALLETS_ACTION,  workerDeleteWalletSaga),
    takeEvery(REQUEST_GET_ALL_TRANSFERS_ACTION,  workerGetAllTransfersSaga),
    takeEvery(REQUEST_GET_MY_TRANSFERS_ACTION,  workerGetMyTransfersSaga),
    takeEvery(REQUEST_POST_ADD_USER_TO_TABLE_ACTION, workerPostAddUserToTableSaga),
    takeEvery(REQUEST_DELETE_PLAYER_ACTION, workerDeletePlayerSaga),
    takeEvery(REQUEST_POST_ROLE_PLAYER_ACTION, workerPostSetRoleToPlayerSaga),
    takeEvery(REQUEST_POST_CREATE_TRANSFER_ACTION, workerPostCreateTransferSaga),
    takeEvery(REQUEST_WALLET_ACTION, workerGetWalletByIdSaga)
  ]);
}
