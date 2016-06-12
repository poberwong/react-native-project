import codePush from 'react-native-code-push'
import Storage from 'react-native-storage'
import ProgressBar from './components/ProgressBar'
import React, { Component } from 'react'
import Home from './components/Home'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers/localStorageReducer'
let stores = createStore(reducer)
import {
  StyleSheet,
  View,
  Navigator
} from 'react-native'

global.storage = new Storage({
  size: 1000,
  defaultExpires: 10 * 365 * 24 * 3600 * 1000,
  enableCache: true
})

export default class extends Component {
  state = {
    progress: 0
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
      <Provider store={stores}>
        <View style={{flex: 1}}>
          <Navigator style = {styles.container}
            initialRoute={{
              component: Home
            }}
            renderScene={(route, navigator) => { // 用来渲染navigator栈顶的route里的component页面
              // route={component: xxx, name: xxx, ...}， navigator.......route 用来在对应界面获取其他键值
              return <route.component navigator={navigator} {...route} {...route.passProps}/>// {...route.passProps}即就是把passProps里的键值对全部以给属性赋值的方式展开 如：test={10}
            }}/>
          <ProgressBar
            style={{height: 2, backgroundColor: 'grey', position: 'absolute', top: 0, right: 0, left: 0}}
            fillStyle={{backgroundColor: 'red'}}
            progress={this.state.progress} />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
