import { useCallback } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { playerFromTableReducerSelector } from '../../redux/reducers/selectors'

import styles from "./TablePage.module.css";

export function TablePageMenu({tableId}) {

  const navigate = useNavigate()

  const player = useSelector(playerFromTableReducerSelector)


  const onClick = useCallback((path) => {
    navigate(`${path}`)
  }, [navigate, tableId])

  return (
    <div className={styles.table_page__form}>
      <p className={styles.table_page__form__part} onClick={() => onClick('')}>О комнате</p>
      <p className={styles.table_page__form__part} onClick={() => onClick('wallets')}>Мои кошельки</p>
      <p className={styles.table_page__form__part} onClick={() => onClick('transfers')}>История переводов</p>
      <p className={styles.table_page__form__part} onClick={() => onClick('transaction')}>Совершить перевод</p>
      {player?.role == 1 && <p className={styles.table_page__form__part} onClick={() => onClick('bank')}>Банк</p>}
    </div>
  );
}
