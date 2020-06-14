import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import "./app.css";
import newQuizReducer from "./store/reducers/newQuiz";
import errorReducer from "./store/reducers/errorReducer";
import authReducer from "./store/reducers/authReducer";
import MainNavigation from "./components/navigation/MainNavigation";

import Register from "./screens/authenticatoinScreens/Register";

const rootReducer = combineReducers({
  newQuiz: newQuizReducer,
  error: errorReducer,
  auth: authReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const initialState = {};

export const store = createStore(rootReducer, initialState, enhancer);

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
