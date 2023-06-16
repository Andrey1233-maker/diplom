import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DefaultInput, DefaultButton } from "../../components";
import { defaultButtonTypes, roomCovers } from "../../consts";
import { requestPostTableActionCreator } from "../../redux/actions/actionCreators";

import "./CreateTeamPage.styles.css";

export function CreateTeamFragment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [choosenCover, setChoosenCover] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onClickCover = useCallback(
    (newColor) => {
      setChoosenCover(newColor);
    },
    [setChoosenCover]
  );

  const onClickBackBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onClickCreateTableBtn = useCallback(() => {
    dispatch(requestPostTableActionCreator(title, description, choosenCover));
  }, [title, description, choosenCover, dispatch]);

  return (
    <div class="fragment">
      <p class="fragment__title">Создание комнаты</p>
      <p class="fragment__field">
        Название комнаты: <DefaultInput value={title} onChange={setTitle} />
      </p>
      <p class="fragment__field">
        Описание комнаты:{" "}
        <DefaultInput value={description} onChange={setDescription} />
      </p>
      <p class="fragment__title_mini">Обложка комнаты</p>
      <div class="fragment__covers">
        {roomCovers.map((color) => (
          <div
            class={`covers__item ${
              color === choosenCover && "cover__item_active"
            }`}
            style={{ background: color }}
            onClick={() => onClickCover(color)}
          />
        ))}
      </div>
      <div class="fragment__btns">
        <DefaultButton
          title={"Создать комнату"}
          type={defaultButtonTypes.ACCEPT}
          onClick={onClickCreateTableBtn}
        />
        <DefaultButton
          title={"Назад"}
          type={defaultButtonTypes.DENY}
          onClick={onClickBackBtn}
        />
      </div>
    </div>
  );
}
