import React, { Component } from 'react'
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import * as firebase from 'firebase';

export default class Vent extends Component {
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }),
    text: ''
  }

  constructor() {
    super()
    this.messages = []
  }

  componentDidMount() {
    firebase.database().ref('messages').on('child_added', (data) => {
      console.log(`new message! ${data.val()}`)
      this.messages.push(data.val())
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.messages)
      })
    })
  }

  componentWillUnmount() {
    firebase.database().ref('messages').off('child_added')
    console.log('unmounting Vent')
  }

  sendMessage(event) {
    const text = event.nativeEvent.text
    if (text) {
      firebase.database().ref('messages').push(text)
    }
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
        <ListView
          style={{flex: 1}}
          dataSource={this.state.dataSource}
          renderRow={(data) => {
            return (
              <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
                <Text style={{fontSize: 10}}>
                  {data}
                </Text>
              </View>
            )
          }}
          /*
          renderSeparator={(section, row, adjacentRowHighlighted) =>
            <View
              key={`${section}-${row}`}
              style={{
                height: 1,
                backgroundColor: '#ccc'
              }}
              />
          }
          */
        />
        <TextInput
          style={{
            flex: 0,
            borderTopWidth: 1,
            borderTopColor: '#eee'
          }}
          returnKeyType='send'
          onSubmitEditing={::this.sendMessage}
          onChangeText={(text) => this.setState({text})}
          blurOnSubmit={false}
          value={this.state.text}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  send: {
    backgroundColor: 'steelblue',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  }
})
