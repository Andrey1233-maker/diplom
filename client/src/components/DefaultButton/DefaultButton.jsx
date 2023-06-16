import { useMemo } from "react";

import { defaultButtonTypes } from "../../consts";

import "./defaultButton.styles.css";

export default function DefaultButton({ title, onClick, type }) {
  const buttonType = useMemo(() => {
    switch (type) {
      case defaultButtonTypes.ACCEPT:
        return "btn__accept";
      case defaultButtonTypes.DENY:
        return "btn__deny";
      default:
        return "btn__original";
    }
  }, [type]);

  return (
    <button class={`btn ${buttonType}`} onClick={onClick}>
      {title}
    </button>
  );
}
