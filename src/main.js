import React, { Component } from 'react'
import {
  BackAndroid,
  Button,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import Menu from './menu'
import Cats from './cats'

const routes = [
  {title: 'Stress Relief', id: 'menu'},
  {title: 'Cats', id: 'cats'},
  {title: 'Minigames', id: 'minigames'},
  {title: 'Memes', id: 'memes'},
]

export default class Main extends Component {
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
      }
    });
  }

  render() {
    return (
      <Navigator
        ref={nav => this.navigator = nav}
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => {
          let back = null;
          if (route.id != 'menu') {
            back =
              <TouchableHighlight onPress={() => navigator.pop()} underlayColor='#d0d0d0'>
                <Text style={{fontSize: 40, marginLeft: 10}}>◁</Text>
              </TouchableHighlight>
          }
          return (
            <View>
              {/* headerbar */}
              <View style={{
                backgroundColor: '#00d8ff',
                flexDirection: 'row',
              }}>
                {back}
                <Text style={{fontSize: 40, marginLeft: 10}}>
                  {route.title}
                </Text>
              </View>

              {/* main view */}
              {(function(){
                if (route.id === 'menu') return <Menu navigator={navigator} routes={routes} style={{flex:1}}/>
                else if (route.id === 'cats') return <Cats />
                else return <Text>wtf no route</Text>
              })()}
            </View>
          )
        }}
      />
    )
  }
}
