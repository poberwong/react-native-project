import codePush from 'react-native-code-push'
import React, { Component } from 'react'
import Palette from './Palette'
import ProgressBar from './ProgressBar'
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native'

class GraduationProject extends Component {
  state = {
    progress: 0,
    modalVisible: false
  }

  /*
   * IMMEDIATE(0) // 更新完毕，立即生效
   * ON_NEXT_RESTART(1) // 下次启动生效
   * ON_NEXT_RESUME(2) // 切到后台，重新回来生效
   */
  componentDidMount () {
    codePush.sync({
      updateDialog: {
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '更新',
        mandatoryUpdateMessage: '',
        optionalUpdateMessage: '',
        appendReleaseDescription: true,
        descriptionPrefix: '有新版本，是否下载？\n\n ==更新内容==\n',
        title: '更新提示'
      },
      installMode: codePush.InstallMode.IMMEDIATE
    }, null,
    progress => {
      this.setState({
        progress: (progress.receivedBytes / progress.totalBytes)
      })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ProgressBar
          style={{height: 2, backgroundColor: 'grey'}}
          fillStyle={{backgroundColor: 'red'}}
          progress={this.state.progress} />
        <Palette currentPercent={this.state.progress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('GraduationProject', () => GraduationProject)
