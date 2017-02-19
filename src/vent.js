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
    text: '',
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
      firebase.database().ref('messages').push(`${this.props.name}: ${text}`)
    }
    this.setState({
      text: ''
    })
  }

  componentDidUpdate() {
    requestAnimationFrame(() =>
      this._scrollView.scrollToEnd({animated: true}))
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex:1}}>
        <ListView
          ref={component => this._scrollView = component}
          style={{flex: 1}}
          dataSource={this.state.dataSource}
          renderRow={(data) => {
            return (
              <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
                <Text style={{fontSize: 20}}>
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
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        }}>
          <Text style={{fontSize: 20}}>{this.props.name + ':'}</Text>
          <TextInput
            style={{
              flex: 1,
            }}
            returnKeyType='send'
            onSubmitEditing={::this.sendMessage}
            onChangeText={(text) => this.setState({text})}
            blurOnSubmit={false}
            value={this.state.text}
          />
        </View>
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
