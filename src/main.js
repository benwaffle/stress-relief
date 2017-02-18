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
    // BackAndroid.addEventListener('hardwareBackPress', function() {
    //   if (this.navigator.getCurrentRoutes().length > 1) {
    //     this.navigator.pop();
    //   }
    // });
  }

  render() {
    return (
      <Navigator
        ref={nav => this.navigator = nav}
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => {
          let back = null;
          if (navigator.getCurrentRoutes().length > 1) {
            back =
              <TouchableHighlight onPress={() => navigator.pop()}>
                <Text style={{fontSize: 30, marginRight: 10}}>◁</Text>
              </TouchableHighlight>
          }
          return (
            <View>
              {/* headerbar */}
              <View style={{
                padding: 10,
                backgroundColor: '#00d8ff',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                {back}
                <Text style={{fontSize: 40}}>
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
