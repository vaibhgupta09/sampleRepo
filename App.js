/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import AppContainer from "./app/containers/AppContainer"
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
const  createStoreWithMiddleware=applyMiddleware(thunk)(createStore);
import listReducer from './app/redux/reducers/listReducer'
const store =createStoreWithMiddleware(listReducer);
export default class App extends PureComponent {
  render() {
    return(
      <Provider store={store}>
      <AppContainer />
      </Provider>
    ) 
  }
}


