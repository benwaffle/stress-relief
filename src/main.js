import React, { Component } from 'react'
import {
  BackAndroid,
  Button,
  Image,
  ListView,
  Navigator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Menu from './menu'
import Cats from './cats'
import Vent from './vent'

import Icon from 'react-native-vector-icons/FontAwesome'

const routes = [
  {title: 'Stress Relief', id: 'menu'},
  {title: 'Cats', id: 'cats'},
  {title: 'Vent', id: 'vent'},
]

const chatName = require('node-random-name')({ first: true })

export default class Main extends Component {
  installHandler(navigator) {
    if (!this.setup && Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (navigator.getCurrentRoutes().length > 1) {
          navigator.pop()
          return true
        }
        return false
      })
      this.setup = true
    }
  }

  render() {
    // Padsize gives top padding to leave room for the time and wifi elements at the top of Iphone.
    let padsize = Platform.OS === 'ios' ? 20 : 0
    return (
      <Navigator
        ref={::this.installHandler}
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => {
          let back = null;
          if (route.id != 'menu') {
            back =
              <TouchableOpacity onPress={navigator.pop} style={{marginLeft: 10}}>
                <Icon name="arrow-left" size={30} />
              </TouchableOpacity>
          }
          return (
            <View style={{flex: 1}}>
              {/* headerbar */}
              <View style={{
                paddingTop: padsize,
                backgroundColor: '#00d8ff',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                {back}
                <Text style={{fontSize: 40, marginLeft: 10}}>
                  {route.title}
                </Text>
              </View>

              {/* main view */}
              {(function(){
                if (route.id === 'menu') return <Menu navigator={navigator} routes={routes} />
                else if (route.id === 'cats') return <Cats />
                else if (route.id === 'vent') return <Vent style={{flex: 1}} name={chatName} />
                else return <Text>wtf no route</Text>
              })()}
            </View>
          )
        }}
      />
    )
  }
}
