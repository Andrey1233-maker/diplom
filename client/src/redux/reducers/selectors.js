// общие селекторы
export const userReducerSelector = (state) => state.userReducer;

export const tableReducerSelector = (state) => state.tableReducer;

export const  tableInfoReducerSelector = (state) => state.tableInfoReducer;

// селектроря для конкретных полей
export const userFromuserReducerSelector = (state) =>
  userReducerSelector(state).user;
//
export const notificationsFromUserReducerSelector = (state) =>
  userReducerSelector(state).notifications;

export const alertFromUserReducerSelector = (state) =>
  userReducerSelector(state).alert;

export const alertErrorFromUserReducerSelector = (state) =>
  userReducerSelector(state).alertError;

export const tablesFromTableReducerSelector = (state) =>
  tableReducerSelector(state).tables;

export const tableFromTableInfoReducerSelector = (state) =>
  tableInfoReducerSelector(state).table

export const walletsFromTableReducerSelector = (state) => 
  tableInfoReducerSelector(state).wallets

export const playerFromTableReducerSelector = (state) => 
  tableInfoReducerSelector(state).player

export const allTransfersFromTableReducerSelector = (state) => 
  tableInfoReducerSelector(state).allTransfers

export const myTransfersFromTableReducerSelector = (state) => 
  tableInfoReducerSelector(state).myTransfers

export const viewWalletSelector = (state) => 
  tableInfoReducerSelector(state).walletView

export const viewWalletTransfersSelector = (state) =>
  tableInfoReducerSelector(state).walletViewTransfers
// комбинированные селекторы

export const alertFullFromUserSelector = (state) => ({
  alert: alertFromUserReducerSelector(state),
  error: alertErrorFromUserReducerSelector(state),
});

export const userAndUserSelector = (state) => ({
  alert: alertFromUserReducerSelector(state),
  user: userReducerSelector(state),
});

export const selectorForTransferStoryPage = (state) => ({
  table: tableFromTableInfoReducerSelector(state),
  player: playerFromTableReducerSelector(state),
  transfers: myTransfersFromTableReducerSelector(state),
})

export const selectorForWalletViewPage = (state) => ({
  wallet: viewWalletSelector(state),
  player: playerFromTableReducerSelector(state),
  transfers: viewWalletTransfersSelector(state),
  table: tableFromTableInfoReducerSelector(state),
})

export const selectorForAdminTransferStoryPage = (state) => ({
  table: tableFromTableInfoReducerSelector(state),
  player: playerFromTableReducerSelector(state),
  transfers: allTransfersFromTableReducerSelector(state),
})
