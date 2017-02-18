import React, { Component } from 'react'
import {
  Button,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

const routes = [
  {title: 'Welcome', index: 0},
  {title: 'Menu', index: 1}
]

class ModuleMenu extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows([
        'minigames',
        'cats',
        'memes',
        'smell the flowers'
      ]),
    }
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data, section, row, highlight) =>
            <TouchableHighlight
              underlayColor='#dddddd'
              onPress={() => {
                highlight(section, row)
              }}
            >
              <Text style={{fontSize: 40}}>{data}</Text>
            </TouchableHighlight>
          }
          renderSeparator={(section, row, adjacentRowHighlighted) =>
            <View
              key={`${section}-${row}`}
              style={{
                height: 1,
                backgroundColor: '#ccc'
              }}
              />
          }
        />
      </View>
    )
  }
}

class WelcomeView extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() => this.props.nav.push(routes[1])}>
        <Text style={{
          fontSize: 60,
          color: 'white',
          textAlign: 'center',
          marginTop: 40,
        }}>
          Welcome
        </Text>
      </TouchableHighlight>
    )
  }
}

export default class Main extends Component {
  render() {
    return (
      <Image
        style={{flex: 1}}
        source={{uri: 'http://www.resortcollection.com/wp-content/themes/resortcollection/property-images/summit/summit-beach-resort-panama-city-beach-fl-beach-01.jpg'}}>
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={(route, navigator) => {
            if (route.index == 0)
              return <WelcomeView nav={navigator} />
            else if (route.index == 1)
              return <ModuleMenu nav={navigator} />
          }}
        />
      </Image>
    )
  }
}
