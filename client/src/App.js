<<<<<<< HEAD
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import './app.css';
import errorReducer from './store/reducers/errorReducer';
import authReducer from './store/reducers/authReducer';
import userReducer from './store/reducers/userReducer';
import quizReducer from './store/reducers/quizReducer';
import MainNavigation from './components/navigation/MainNavigation';
import theme from './style/theme';
import {ThemeProvider} from '@material-ui/core/styles';

const rootReducer = combineReducers ({
=======
import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import "./app.css";
import errorReducer from "./store/reducers/errorReducer";
import authReducer from "./store/reducers/authReducer";
import userReducer from "./store/reducers/userReducer";
import quizReducer from "./store/reducers/quizReducer";
import MainNavigation from "./components/navigation/MainNavigation";
import theme from "./style/theme";
import { ThemeProvider } from "@material-ui/core/styles";

const rootReducer = combineReducers({
>>>>>>> 551095f8b90b191e5a3b0ecdcc7996c303db67d3
  quiz: quizReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer,
});

<<<<<<< HEAD
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ (
      {
=======
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
>>>>>>> 551095f8b90b191e5a3b0ecdcc7996c303db67d3
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }
    )
  : compose;
const enhancer = composeEnhancers (applyMiddleware (ReduxThunk));
export const store = createStore (rootReducer, enhancer);

export default function AppWrapper () {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MainNavigation />
      </ThemeProvider>
    </Provider>
  );
}
