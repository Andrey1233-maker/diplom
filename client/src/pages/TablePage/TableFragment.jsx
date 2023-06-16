import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { requestTableByIdActionCreator } from './../../redux/actions/actionCreators'

import { TablePageMenu } from "./TablePageMenu";

import styles from "./TablePage.module.css";

export function TableFragment() {
  
  const dispatch = useDispatch();
  const { id } = useParams()

  useEffect(() => {
    dispatch(requestTableByIdActionCreator(id))
  }, [id, dispatch])

  return (
    <div className={styles.table_page_content}>
      <TablePageMenu tableId={id}/>
      <Outlet />
    </div>
  );
}
