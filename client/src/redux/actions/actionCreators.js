import {
  SET_ALERT_TO_USER_REDUCE_ACTION,
  REQUEST_DELETE_NOTIFICATION_ACTION,
  REQUEST_GET_AUTH_DAFAULT_LOGIN_ACTION,
  REQUEST_GET_NOTIFICATIONS_ACTION,
  REQUEST_GET_USER_WHO_AM_I_ACTION,
  REQUEST_POST_AUTH_DEFAULT_REG_ACTION,
  SET_NOTIFICATIONS_TO_USER_REDUCE_ACTION,
  SET_USER_TO_USER_REDUCE_ACTION,
  SET_TABLES_TO_TABLES_REDUCER_ACTION,
  REQUEST_POST_TABLE_ACTION,
  REQUEST_GET_TABLES_ACTION,
  SET_SELECTED_TABLE_TO_TABLE_REDUCER_ACTION,
  REQUEST_TABLE_BY_ID_ACTION,
  REQUEST_GET_WALLETS_ACTION,
  REQUEST_DELETE_WALLETS_ACTION,
  REQUEST_POST_WALLETS_ACTION,
  SET_WALLETS_TO_REDUCER_ACTION,
  SET_ALL_TRANSFERS_TO_REDUX_ACTION,
  SET_MY_TRANSFERS_TO_REDUX_ACTION,
  REQUEST_GET_ALL_TRANSFERS_ACTION,
  REQUEST_GET_MY_TRANSFERS_ACTION,
  REQUEST_POST_ADD_USER_TO_TABLE_ACTION,
  REQUEST_POST_ROLE_PLAYER_ACTION,
  REQUEST_DELETE_PLAYER_ACTION,
  REQUEST_POST_CREATE_TRANSFER_ACTION,
  REQUEST_WALLET_ACTION,
  SET_WALLET_AND_TRANSFERS_TO_REDUCER_ACTION,
} from "./actionTypes";

export function requestGetAuthDefaultLoginActionCreator(email, auth_key) {
  return {
    type: REQUEST_GET_AUTH_DAFAULT_LOGIN_ACTION,
    email,
    auth_key,
  };
}

export function requestPostAuthDefaultRegActionCreator(email, auth_key, name) {
  return {
    type: REQUEST_POST_AUTH_DEFAULT_REG_ACTION,
    email,
    auth_key,
    name,
  };
}

export function setUserToUserReduceActionCreator(user) {
  return {
    type: SET_USER_TO_USER_REDUCE_ACTION,
    user,
  };
}

export function requestGetUserWhoAmIActionCreator() {
  return {
    type: REQUEST_GET_USER_WHO_AM_I_ACTION,
  };
}

export function setNotificationsActionCreator(notifications) {
  return {
    type: SET_NOTIFICATIONS_TO_USER_REDUCE_ACTION,
    notifications,
  };
}

export function requestNotificationsActionCreator() {
  return {
    type: REQUEST_GET_NOTIFICATIONS_ACTION,
  };
}

export function requestDeleteNotificationActionCreator(id) {
  return {
    type: REQUEST_DELETE_NOTIFICATION_ACTION,
    id,
  };
}

export function setAlertToUserReduxActionCreator(content, error) {
  return {
    type: SET_ALERT_TO_USER_REDUCE_ACTION,
    content,
    error,
  };
}

export function setTablesToTableReducerActionCreator(tables) {
  return {
    type: SET_TABLES_TO_TABLES_REDUCER_ACTION,
    tables,
  };
}

export function requestPostTableActionCreator(title, description, style) {
  return {
    type: REQUEST_POST_TABLE_ACTION,
    title,
    description,
    style,
  };
}

export function requestGetTablesActionCreator() {
  return {
    type: REQUEST_GET_TABLES_ACTION,
  };
}

export function setTableToTableReducerActionCreator(table, player) {
  return {
    type: SET_SELECTED_TABLE_TO_TABLE_REDUCER_ACTION,
    table,
    player,
  }
}

export function requestTableByIdActionCreator(id) {
  return {
    type: REQUEST_TABLE_BY_ID_ACTION,
    id,
  }
}

export function requestGetWalletsActionCreator(id) {
  return {
    type: REQUEST_GET_WALLETS_ACTION,
    id,
  }
}

export function requestDeleteWalletActionCreator(id, player) {
  return {
    type: REQUEST_DELETE_WALLETS_ACTION,
    id,
    player,
  }
}

export function requestPostWalletActionCreator(balance, playerId, number, style) {
  return {
    type: REQUEST_POST_WALLETS_ACTION,
    balance,
    playerId, 
    number, 
    style,
  }
}

export function setWalletsToReducerActionCreator(wallets) {
  return {
    type: SET_WALLETS_TO_REDUCER_ACTION,
    wallets,
  }
}

export function setAllTransfersToReduxActionCreator(transfers) {
  return {
    type: SET_ALL_TRANSFERS_TO_REDUX_ACTION,
    transfers,
  }
}

export function setMyTransfersToReduxActionCreator(transfers) {
  return {
    type: SET_MY_TRANSFERS_TO_REDUX_ACTION,
    transfers,
  }
}

export function requestAllTransfersActionCreator(tableId) {
  return {
    type: REQUEST_GET_ALL_TRANSFERS_ACTION,
    tableId,
  }
}

export function requestMyTransfersActionCreator(tableId, playerId) {
  return {
    type: REQUEST_GET_MY_TRANSFERS_ACTION,
    tableId,
    playerId,
  }
}

export function requestPostAddUserToTableActionCreator(tableId, userEmail) {
  return {
    type: REQUEST_POST_ADD_USER_TO_TABLE_ACTION,
    tableId, 
    userEmail,
  }
}

export function requestDeletePlayerActionCreator(id, tableId) {
  return {
    type: REQUEST_DELETE_PLAYER_ACTION,
    id,
    tableId,
  }
}

export function requestPostPlayerRoleActionCreator(id, role, tableId) {
  return {
    type: REQUEST_POST_ROLE_PLAYER_ACTION,
    id,
    tableId,
    role,
  }
}

export function requestCreateTransferActionCreator(tableId, playerId, sum, id, recipientId) {
  return {
    type: REQUEST_POST_CREATE_TRANSFER_ACTION,
    tableId, 
    playerId, 
    sum, 
    id,
    recipientId,
  }
}

export function requestWalletActionCreator(id) {
  return {
    type: REQUEST_WALLET_ACTION,
    id,
  }
}

export function setWalletToReducerActionCreator(wallet, transfers) {
  return {
    type: SET_WALLET_AND_TRANSFERS_TO_REDUCER_ACTION,
    wallet, 
    transfers,
  }
}