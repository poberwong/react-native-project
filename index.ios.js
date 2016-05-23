import codePush from "react-native-code-push";
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class GraduationProject extends Component {
  componentDidMount () {
    codePush.sync({
      deploymentKey: 'UNDqQ6nfgrk2VZEIQdc8vVITbmmeVJ34mxQfZ',
      updateDialog: {
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '后台更新',
        optionalUpdateMessage: 'Bundle有版本更新，是否下载？',
        title: '更新提示'
      },
      installMode: codePush.InstallMode.ON_NEXT_RESTART
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          current version of code: 0.0.2
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GraduationProject', () => GraduationProject);
