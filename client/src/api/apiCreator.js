import { AUTH_DEFAULT_LOGIN_PATH, NOTIFICATION_PATH, TABLE_PATH } from "./";
import { PLAYER_PATH, TRANSFER_PATH, WALLET_PATH } from "./apiPath";

function getAuthDefaultLoginQueryCreator(email, password) {
  return `${AUTH_DEFAULT_LOGIN_PATH}?email=${email}&auth_key=${password}`;
}

function notificationWithIdQueryCreator(id) {
  return `${NOTIFICATION_PATH}/${id}`;
}

function tableWithIdQueryCreator(id) {
  return `${TABLE_PATH}/${id}`
}

function walletWithTableIdQueryCreator(id) {
  return `${WALLET_PATH}/by-table/${id}`
}

function walletWithIdQueryCreator(id) {
  return `${WALLET_PATH}/${id}`
}

function transferWithTableQueryCreator(id) {
  return `${TRANSFER_PATH}/table/${id}`
}

function transferWithTableAndPlayerQueryCreator(id, playerId) {
  return `${TRANSFER_PATH}/table/${id}/player/${playerId}`
}

function tableWithIdAndUserEmailQueryCreator(id, email) {
  return `${TABLE_PATH}/${id}/user/${email}`
}

function playerWithIdQueryCreator(id) {
  return `${PLAYER_PATH}/${id}`
}

function playerWithIdAndRoleQueryCreator(id) {
  return `${playerWithIdQueryCreator(id)}/role`
}

function walletCreateTransferQueryCreator(id) {
  return `${WALLET_PATH}/${id}/transfer`
}

export { 
  getAuthDefaultLoginQueryCreator, 
  notificationWithIdQueryCreator, 
  tableWithIdQueryCreator,
  walletWithTableIdQueryCreator,
  walletWithIdQueryCreator,
  transferWithTableQueryCreator,
  transferWithTableAndPlayerQueryCreator,
  tableWithIdAndUserEmailQueryCreator,
  playerWithIdQueryCreator,
  playerWithIdAndRoleQueryCreator,
  walletCreateTransferQueryCreator,
};
