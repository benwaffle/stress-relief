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
          let back = route.id === 'menu' ? null :
              <TouchableOpacity onPress={navigator.pop} style={{
                position: 'absolute',
                top: 35,
                left: 35
              }}>
                <Icon name="arrow-left" size={30} />
              </TouchableOpacity>
          let footer = route.id !== 'menu' ? null :
              <Text style={{textAlign: 'center', marginBottom: 20}}>
                Made with <Icon name='heart' color='hotpink' /> at VentureHacks <Text style={{color: 'red', fontWeight: 'bold'}}>Red</Text>
              </Text>

          return (
            <View style={{flex: 1}}>
              {/* headerbar */}
              <View style={{
                paddingTop: padsize,
                backgroundColor: '#00d8ff',
                flexDirection: 'row',
                alignItems: 'center',
                height: 100,
              }}>
                <Text style={{fontSize: 40, marginLeft: 10, textAlign: 'center', flex: 1}}>
                  {route.title}
                </Text>
                {back}
              </View>

              <View style={{flex: 1}}>
                {/* main view */}
                {(function(){
                  if (route.id === 'menu') return <Menu navigator={navigator} routes={routes} />
                  else if (route.id === 'cats') return <Cats />
                  else if (route.id === 'vent') return <Vent style={{flex: 1}} name={chatName} />
                  else return <Text>wtf no route</Text>
                })()}
              </View>

              {/* footer */}
              {footer}
            </View>
          )
        }}
      />
    )
  }
}
