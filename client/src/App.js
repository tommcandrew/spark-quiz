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


  return (
     <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}