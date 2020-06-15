import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import "./app.css";
import quizReducer from "./store/reducers/quizReducer";
import errorReducer from "./store/reducers/errorReducer";
import authReducer from "./store/reducers/authReducer";
import userReducer from "./store/reducers/userReducer";
import MainNavigation from "./components/navigation/MainNavigation";

import Register from "./screens/authenticatoinScreens/Register";

const rootReducer = combineReducers({
  quiz: quizReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));
export const store = createStore(rootReducer, enhancer);

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
