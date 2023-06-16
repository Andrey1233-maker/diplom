import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import "./TableItem.styles.css";

export default function TableItem({ table, createTable }) {
  const navigate = useNavigate();

  const onClickCreateBtn = useCallback(() => {
    navigate("/create");
  }, [navigate]);

  const onClickDefaultBlock = useCallback(() => {
    navigate(`/table/${table.id}`)
  }, [navigate, table])

  const onClickBlock = useMemo(() => {
    if(createTable) {
      return onClickCreateBtn
    }

    return onClickDefaultBlock
  }, [createTable, onClickCreateBtn, onClickDefaultBlock])

  const content = useMemo(() => {
    if (createTable) {
      return (
        <>
          <p class="block__title">Создать комнату</p>
        </>
      );
    }

    if (table) {
      return (
        <>
          <p style={{ color: table.style }} class="block__title">
            {table.title}
          </p>
          <p style={{ color: table.style }} class="block__description">
            {table.description}
          </p>
        </>
      );
    }

    return (
      <>
        <p class="block__title">Присоеденниться к комнате</p>
        <input class="block__input" />
      </>
    );
  }, [table, createTable]);

  return (
    <div
      class={`block ${createTable && "block__create"}`}
      style={
        !createTable && table
          ? {
              background: `${table.style}8f`,
              border: `3px solid ${table.style}`,
            }
          : {}
      }
      onClick={onClickBlock}
    >
      {content}
    </div>
  );
}
