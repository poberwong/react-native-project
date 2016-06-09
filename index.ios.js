import React, { Component } from 'react'
import App from './src/App'
import {
  AppRegistry
} from 'react-native'

class GraduationProject extends Component {
  render () {
    return <App />
  }
}

AppRegistry.registerComponent('GraduationProject', () => GraduationProject)
