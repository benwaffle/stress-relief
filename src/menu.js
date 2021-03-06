import React, { Component } from 'react'
import { ListView, View, TouchableHighlight, Text } from 'react-native'

export default class extends Component {
  constructor() {
    super()
    this.data = [
      'Cats',
      'Vent',
    ]
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this.data),
    }
  }

  pressRow(id) {
    if (this.data[id] === 'Cats')
      this.props.navigator.push(this.props.routes[1])
    if (this.data[id] === 'Vent')
      this.props.navigator.push(this.props.routes[2])
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
                this.pressRow(row)
              }}>
              <Text style={{fontSize: 30, margin: 20}}>{data}</Text>
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
