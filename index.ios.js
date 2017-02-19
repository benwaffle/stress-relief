import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import Main from './src/main'

export default class App extends Component {
  render() {
    return (
      <Main />
    )
  }
}

import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDT0fNtUdginrnTGSokA6pHh0rxQNIPjcE",
  authDomain: "stress-relief.firebaseapp.com",
  databaseURL: "https://stress-relief.firebaseio.com",
  storageBucket: "stress-relief.appspot.com",
  messagingSenderId: "425289882012"
}
firebase.initializeApp(config);


AppRegistry.registerComponent('venturehacks', () => App)
