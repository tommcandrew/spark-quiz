import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import "./app.css";
import errorReducer from "./store/reducers/errorReducer";
import authReducer from "./store/reducers/authReducer";
import quizzesListReducer from "./store/reducers/quizzesListReducer";
import quizReducer from "./store/reducers/quizReducer";
import quizScoreReducer from "./store/reducers/quizScoreReducer"
import MainNavigation from "./components/navigation/MainNavigation";
import theme from "./style/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import Modal from 'react-modal';

Modal.setAppElement("#root")
const rootReducer = combineReducers({
  quiz: quizReducer,
  error: errorReducer,
  auth: authReducer,
  quizzesList: quizzesListReducer,
  score: quizScoreReducer,
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
      <ThemeProvider theme={theme}>
        <MainNavigation />
      </ThemeProvider>
    </Provider>
  );
}
