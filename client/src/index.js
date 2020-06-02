import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './view/login';
import Load from './loading';
import { saveState, loadState } from './utils/localStorage';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
const persistedState = loadState();
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));
store.subscribe(() => {
  saveState({
    selectedProducts: store.getState().selectedProducts
  });
});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <Switch>
        <Route path="/app" component={App} />
        <Route path="/login" component={Login} />
        <Redirect exact from="/" to="/app/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
