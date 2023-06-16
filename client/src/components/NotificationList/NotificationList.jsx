import { useDispatch } from "react-redux";
import { useCallback } from "react";

import { requestDeleteNotificationActionCreator } from "../../redux/actions/actionCreators";
import close_icon from "./X.svg";

import "./NotificationList.styles.css";

export default function NotificationList({ notifications, closeForm }) {
  const dispatch = useDispatch();

  const onCLickDeleteNotification = useCallback(
    (id) => {
      dispatch(requestDeleteNotificationActionCreator(id));
    },
    [dispatch]
  );

  return (
    <div class="notification_list__form">
      <img
        src={close_icon}
        className="notification_list__form__close_icon"
        alt="Удалить"
        onClick={closeForm}
      />
      <p class="notification_list__form__title">
        У вас <span class="form__title__bold">{notifications?.length}</span>{" "}
        уведомлений
      </p>
      {notifications?.map((notification) => (
        <div class="notificaton_list__item">
          <p class="item__text">{notification.content}</p>
          <img
            src={close_icon}
            className="item__delete_icon"
            alt="Удалить"
            onClick={() => onCLickDeleteNotification(notification.id)}
          />
        </div>
      ))}
    </div>
  );
}
