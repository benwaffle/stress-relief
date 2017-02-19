import React, { Component } from 'react'
import { ScrollView, View, Button, Image, Dimensions } from 'react-native'
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
        Image.getSize(b64, (w, h) => {
          const win = Dimensions.get('window')
          if (w < win.width) {
            w = win.width
            h = win.height * 0.5;
          }
          if (this.mounted)
            this.setState({image: b64, width: w, height: h})
        })
      })
  }

  componentDidMount() {
    this.mounted = true
    this.downloadImage() // download image on start up
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return (
      <ScrollView style={{margin:20}}>
        {(() => {
          if (this.state.image) {
            return <Image
              style={{width: this.state.width, height: this.state.height}}
              source={{uri: this.state.image}} />
          }
        })()}
        <View style={{marginTop: 10}}>
          <Button
            onPress={() => this.downloadImage()}
            title="Another one!"
          />
        </View>
      </ScrollView>
    )
  }
}
