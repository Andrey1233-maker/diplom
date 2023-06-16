import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { DefaultButton, DefaultInput } from "../../components";
import { defaultButtonTypes } from "../../consts";
import {
  setAlertToUserReduxActionCreator,
  requestPostAuthDefaultRegActionCreator,
} from "../../redux/actions/actionCreators";

export function RegistrationFragment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailValue, setmailValue] = useState("");
  const [nickNammeValue, setNickNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordRepeatValue, setPasswordRepeatValue] = useState("");

  const onChangeEmailValue = useCallback(
    (newEmail) => {
      setmailValue(newEmail);
    },
    [setmailValue]
  );

  const onChangeNickNammeValue = useCallback(
    (newName) => {
      setNickNameValue(newName);
    },
    [setNickNameValue]
  );

  const onChangePasswordValue = useCallback(
    (newPassword) => {
      setPasswordValue(newPassword);
    },
    [setPasswordValue]
  );

  const onChangePasswordRepeatValue = useCallback(
    (newPassword) => {
      setPasswordRepeatValue(newPassword);
    },
    [setPasswordRepeatValue]
  );

  const onClickAuthBtn = useCallback(() => {
    if (
      !(
        emailValue?.length &&
        nickNammeValue?.length &&
        passwordValue?.length &&
        passwordRepeatValue?.length
      )
    ) {
      dispatch(
        setAlertToUserReduxActionCreator("Поля не должны быть пустыми", true)
      );
      return;
    }
    if (passwordValue !== passwordRepeatValue) {
      dispatch(setAlertToUserReduxActionCreator("Пароли не совпадают", true));
      return;
    }
    dispatch(
      requestPostAuthDefaultRegActionCreator(
        emailValue,
        passwordValue,
        nickNammeValue
      )
    );
  }, [
    emailValue,
    passwordValue,
    nickNammeValue,
    passwordRepeatValue,
    dispatch,
  ]);

  const onClickExitBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onClickGoogleBtn = useCallback(() => {
    window.location.assign(
      "https://accounts.google.com/o/oauth2/auth?client_id=724831104412-3j4keepifvf6n3jdes2ti455v0ick2lp.apps.googleusercontent.com&redirect_uri=http://localhost:5000/auth/google/callback&access_type=offline&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
    );
  }, []);

  return (
    <div class="registration_fragment">
      <p class="registration_fragment__title">Регистрация</p>
      <p class="registration_fragment__desc">
        Для регистрации нужно ввести настоящий email, на него придет письмо для
        поддтверждения почты.
        <br />
        <br />
        Но мы советуем зарегестрироваться через Google
      </p>
      <div class="registration_fragment__inps">
        <DefaultInput
          title={"Почта"}
          value={emailValue}
          onChange={onChangeEmailValue}
        />
        <DefaultInput
          title={"Никнейм"}
          value={nickNammeValue}
          onChange={onChangeNickNammeValue}
        />
        <DefaultInput
          title={"Пароль"}
          value={passwordValue}
          onChange={onChangePasswordValue}
        />
        <DefaultInput
          title={"Подтверждение пароля"}
          value={passwordRepeatValue}
          onChange={onChangePasswordRepeatValue}
        />
      </div>
      <div class="registration_fragment__btns">
        <DefaultButton
          onClick={onClickAuthBtn}
          title="Зарегестрироваться"
          type={defaultButtonTypes.ACCEPT}
        />
        <DefaultButton
          onClick={onClickGoogleBtn}
          title="Войти через Google"
          type={defaultButtonTypes.DENY}
        />
        <DefaultButton onClick={onClickExitBtn} title="Назад" />
      </div>
    </div>
  );
}
