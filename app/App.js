/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './redux/reducer/reducer';

import thunkMiddleWare from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from "redux-logger";

import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

import {
  Text,
  Button
} from 'react-native';


import Root from './components/Root';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleWare,
    createLogger()
  )
)

const App = () => {

  const onPressPOST = () => {
    console.log('onPressPOST')
    // POST url : http://147.46.241.199:8009/obgy/

    axios.post('http://147.46.241.199:8009/bw/', {
      'patient_id' : DeviceInfo.getUniqueId(),
      'value': 100
    },{
      withCredentials: true
    }).then(res => {
    }).catch(e => {console.log(e)})
  }


  const uniqueID = DeviceInfo.getUniqueId();

  const getResponse = async () => {
    try {
      let response = await fetch(
        'http://147.46.241.199:8009/obgy/obgy_test/'
      );
      let json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <Provider store={store}>
      <Root />
      <Text>{uniqueID}</Text>
      <Button
          title="POST-TEST"
          onPress={onPressPOST}
        ></Button>
        <Button
          title="GET-TEST"
          onPress={getResponse}
        ></Button>
    </Provider>
  )
}




export default App;
