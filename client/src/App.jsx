import { Suspense, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NotificationModal } from "./components";
import { MainRouting } from "./MainRouting";
import { requestGetUserWhoAmIActionCreator } from "./redux/actions/actionCreators";
import { userAndUserSelector } from "./redux/reducers/selectors";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { user, alert } = useSelector(userAndUserSelector);

  useEffect(() => {
    dispatch(requestGetUserWhoAmIActionCreator());
  }, [dispatch]);

  return (
    <div className="App">
      <Suspense fallback={<>Loading...</>}>
        <MainRouting token={user.user} />
        {alert && <NotificationModal />}
      </Suspense>
    </div>
  );
}

export default App;
