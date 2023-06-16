import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { defaultButtonTypes } from "../../consts";
import { DefaultButton } from "../";
import { setAlertToUserReduxActionCreator } from "../../redux/actions/actionCreators";
import { alertFullFromUserSelector } from "../../redux/reducers/selectors";

import "./notificationModal.styles.css";

export default function NotificationModal() {
  const dispatch = useDispatch();

  const { alert, error } = useSelector(alertFullFromUserSelector);

  const onClickAccept = useCallback(() => {
    dispatch(setAlertToUserReduxActionCreator(null, null));
  }, [dispatch]);

  return (
    <div class="notification_modal__bg">
      <div class={`notification_modal ${error && "notification_modal_err"}`}>
        <p class="notification_modal__title">Предупреждение</p>
        <p>{alert}</p>
        <DefaultButton
          title="Понятно"
          onClick={onClickAccept}
          type={error ? defaultButtonTypes.DENY : defaultButtonTypes.ACCEPT}
        />
      </div>
    </div>
  );
}
