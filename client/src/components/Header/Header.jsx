import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getProfilePictureByUser } from '../../utils'
import { BorderButton, NotificationListBtn } from "../";
import { userFromuserReducerSelector } from "../../redux/reducers/selectors";

import logo from "../../logo.svg";

import "./header.styles.css";

export default function Header() {
  const navigate = useNavigate();

  const user = useSelector(userFromuserReducerSelector);

  const onClickRegBtn = useCallback(() => {
    navigate("/reg");
  }, [navigate]);

  const onClickAuthBtn = useCallback(() => {
    navigate("/auth");
  }, [navigate]);

  const onClickLogo = useCallback(() => {
    navigate("/tables")
  }, [navigate])

  const userContent = useMemo(() => {
    if (user) {
      console.log(user);
      return (
        <div class="header__user">
          <NotificationListBtn />
          <img src={getProfilePictureByUser(user)} class="header__avatar" alt="avatar" />
          <div class="header__user_names">
            <p class="user__name">{user.name}</p>
            <p class="user__email">{user.email}</p>
          </div>
        </div>
      );
    }
    return (
      <div class="header__btns">
        <BorderButton label={"Регистрация"} onClick={onClickRegBtn} />
        <BorderButton label={"Вход"} onClick={onClickAuthBtn} />
      </div>
    );
  }, [user, onClickAuthBtn, onClickRegBtn]);

  return (
    <div class="header">
      <div class="header__title" onClick={onClickLogo}>
        <img class="header__logo" src={logo} alt="logo" />
        <p>Кошелёк монополии</p>
      </div>
      {userContent}
    </div>
  );
}
