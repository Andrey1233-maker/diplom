import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DefaultInput, DefaultButton } from "../../components";
import { defaultButtonTypes, googleAuthLink } from "../../consts";
import { requestGetAuthDefaultLoginActionCreator } from "../../redux/actions/actionCreators";

export function AuthFragment() {
  const [emailValue, setmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeEmailValue = useCallback(
    (newEmail) => {
      setmailValue(newEmail);
    },
    [setmailValue]
  );

  const onChangePasswordValue = useCallback(
    (newPassword) => {
      setPasswordValue(newPassword);
    },
    [setPasswordValue]
  );

  const onClickAuthBtn = useCallback(() => {
    window.location.assign(googleAuthLink);
  }, []);

  const onClickDefaultAuthBtn = useCallback(() => {
    dispatch(
      requestGetAuthDefaultLoginActionCreator(emailValue, passwordValue)
    );
  }, [dispatch, emailValue, passwordValue]);

  const onClickRegBtn = useCallback(() => {
    navigate("/reg");
  }, [navigate]);

  return (
    <div class="auth_fragment">
      <p class="auth_fragment__title">Авторизация</p>
      <div class="auth_fragment__inps">
        <DefaultInput
          title={"Почта"}
          value={emailValue}
          onChange={onChangeEmailValue}
        />
        <DefaultInput
          title={"Пароль"}
          value={passwordValue}
          onChange={onChangePasswordValue}
          type="password"
        />
      </div>
      <div class="auth_fragment__btns">
        <DefaultButton
          onClick={onClickDefaultAuthBtn}
          title="Войти"
          type={defaultButtonTypes.ACCEPT}
        />
        <DefaultButton
          onClick={onClickAuthBtn}
          title="Войти через Google"
          type={defaultButtonTypes.DENY}
        />
        <DefaultButton onClick={onClickRegBtn} title="Регистрация" />
      </div>
    </div>
  );
}
