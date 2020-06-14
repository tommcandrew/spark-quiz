<<<<<<< Updated upstream
import React from "react";
import MainNavigation from './components/navigation/MainNavigation'
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import './app.css'
import newQuizReducer from './store/reducers/newQuiz'


export default function App() {

  const rootReducer = combineReducers ({
  newQuiz: newQuizReducer 
  });
  const store = createStore (rootReducer);

=======
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import './app.css';
import newQuizReducer from './store/reducers/newQuiz';
import errorReducer from './store/reducers/errorReducer';
import authReducer from './store/reducers/authReducer';
import MainNavigation from './components/navigation/MainNavigation'


import Register from './screens/authenticatoinScreens/Register'


export default function AppWrapper () {
  const rootReducer = combineReducers ({
    newQuiz: newQuizReducer,
    error: errorReducer,
    auth: authReducer,
  });
>>>>>>> Stashed changes

  const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ (
      {
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }
    )
  : compose;
const enhancer = composeEnhancers (
  applyMiddleware(ReduxThunk)
);
  const store = createStore(rootReducer, enhancer);
  
  
  return (
<<<<<<< Updated upstream
     <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}
=======
    <Provider store={store}>
      <App />
    </Provider>
  );
}



const App = () => {
  return(<MainNavigation />)
};
>>>>>>> Stashed changes
