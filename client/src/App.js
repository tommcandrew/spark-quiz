import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import './app.css';
import newQuizReducer from './store/reducers/newQuiz';
import errorReducer from './store/reducers/errorReducer';
import authReducer from './store/reducers/authReducer';
import MainNavigation from './components/navigation/MainNavigation'
import theme from './style/theme'
import { ThemeProvider } from '@material-ui/core/styles';


const rootReducer = combineReducers({
  quiz: quizReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer,
});

import Register from './screens/authenticationScreens/Register'


export default function AppWrapper () {
  const rootReducer = combineReducers ({
    newQuiz: newQuizReducer,
    error: errorReducer,
    auth: authReducer,
  });
  const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ (
      {

        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));
export const store = createStore(rootReducer, enhancer);

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <ThemeProvider theme = {theme}>
      <MainNavigation /></ThemeProvider>

    </Provider>
  );
}
