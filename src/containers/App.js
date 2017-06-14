import React, { Component } from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import { community, user } from '../reducers';

// translate plugin
import I18n from '../i18n';

import {
  AppRegistry,
  Text,
  View,
} from 'react-native';

import { 
  ValidateDni
} from './index';

import icon from '../assets/icons/chevronLeft.png';

const RouterWithRedux = connect()(Router);

const middleware = applyMiddleware(logger);

const reducer = combineReducers({community, user});
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

// store.subscribe(() =>{
//     console.log("Store Changed", store.getState());
// });

// alert(JSON.stringify(reducers))
// store.dispatch({ type : "FETCHING_POST" })

/* ... */

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <RouterWithRedux>
            <Scene 
              key="root" 
              backButtonTextStyle={{ color: '#fff' }} 
              navigationBarStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0 }} 
              backButtonImage={ icon } 
              titleStyle={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>
                <Scene key="VALIDATE_DNI" component={ ValidateDni } hideNavBar={ true }  initial={true} />
            </Scene>
          </RouterWithRedux>
        </Provider>
    )
  }
}
 

 