import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotificationList from "./NotificationList";

import bell_icon from "./Bell.svg";

import { notificationsFromUserReducerSelector } from "../../redux/reducers/selectors";
import { requestNotificationsActionCreator } from "../../redux/actions/actionCreators";

import "./NotificationList.styles.css";

export default function NotificationListBtn() {
  const dispatch = useDispatch();

  const notifications = useSelector(notificationsFromUserReducerSelector);

  const [formIsOpen, setFormIsOpen] = useState(false);

  const countNewNotifications = useMemo(
    () =>
      notifications.filter((notification) => {
        return !notification.isReaded;
      }).length,
    [notifications]
  );

  const onClickBtn = useCallback(() => {
    setFormIsOpen((prev) => !prev);
  }, [setFormIsOpen]);

  useEffect(() => {
    dispatch(requestNotificationsActionCreator());
  }, [dispatch]);

  return (
    <>
      <div class="notification_btn" onClick={onClickBtn}>
        <img src={bell_icon} alt="уведомления" class="notification_btn__icon" />
        {countNewNotifications > 0 && (
          <div class="notification_btn__new_count">{countNewNotifications}</div>
        )}
      </div>
      {formIsOpen && (
        <NotificationList
          notifications={notifications ?? []}
          closeForm={onClickBtn}
        />
      )}
    </>
  );
}
