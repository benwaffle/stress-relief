import React, { Component } from 'react'
import { View, Button, Image } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'

export default class extends Component {
  constructor() {
    super()
    this.state = {
      image: ''
    }
  }

  downloadImage() {
    RNFetchBlob
      .fetch('GET', 'http://thecatapi.com/api/images/get?size=med&type=gif')
      .then(res => {
        const type = res.respInfo.headers['Content-Type']
        console.log(type)
        return `data:${type};base64,${res.base64()}`
      })
      .then(b64 => {
        this.setState({image: b64})
      })
  }

  render() {
    return (
      <View>
        <Image
          style={{width: 500, height: 300}}
          source={{uri: this.state.image}}
        />
        <Button
          style={{fontSize: 20}}
          onPress={() => this.downloadImage()}
          title="Another one!"
        />
      </View>
    )
  }
}
