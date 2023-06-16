import { postAuthDefaultRegReuest, postTableRequest } from "./requests/post";
import {
  getAuthDefaultLoginRequest,
  getNotificationsRequest,
  getTablesRequest,
  getUserWhoAmIRequest,
  getWalletsByTableRequest,
} from "./requests/get";
import { deleteNotificationRequest } from "./requests/delete";
import {
  getAuthDefaultLoginQueryCreator,
  notificationWithIdQueryCreator,
} from "./apiCreator";
import api from "./apiConfig";
import {
  AUTH_DEFAULT_LOGIN_PATH,
  AUTH_DEFAULT_REG_PATH,
  USER_WHO_AM_I_PATH,
  NOTIFICATION_PATH,
  TABLE_PATH,
} from "./apiPath";

export {
  // post requests
  postAuthDefaultRegReuest,
  postTableRequest,
  /// get requests
  getAuthDefaultLoginRequest,
  getNotificationsRequest,
  getTablesRequest,
  getUserWhoAmIRequest,
  getWalletsByTableRequest,
  // delete requests
  deleteNotificationRequest,
  // api creators
  getAuthDefaultLoginQueryCreator,
  notificationWithIdQueryCreator,
  // api
  api,
  // api  paths
  AUTH_DEFAULT_LOGIN_PATH,
  AUTH_DEFAULT_REG_PATH,
  USER_WHO_AM_I_PATH,
  NOTIFICATION_PATH,
  TABLE_PATH,
};
