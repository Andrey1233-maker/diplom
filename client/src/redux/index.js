import reducer from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { saga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(saga);
