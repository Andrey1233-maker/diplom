import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { TableItem } from "../../components";
import { tablesFromTableReducerSelector } from "../../redux/reducers/selectors";
import { requestGetTablesActionCreator } from "../../redux/actions/actionCreators";

import "./tableListPage.styles.css";

export function TableListFragment() {
  const dispatch = useDispatch();

  const tables = useSelector(tablesFromTableReducerSelector);

  useEffect(() => {
    dispatch(requestGetTablesActionCreator());
  }, [dispatch]);

  return (
    <div class="list__bg">
      <div class="list">
        <TableItem createTable={true} />
        <TableItem table={null} />
        {tables?.map((table) => (
          <TableItem table={table} />
        ))}
      </div>
    </div>
  );
}
