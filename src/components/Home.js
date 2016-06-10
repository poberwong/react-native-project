import React from 'react'
import { Text, View, ListView } from 'react-native'
import NavBar from 'react-native-navigationbar'
import Icon from 'react-native-vector-icons/FontAwesome'
import Palette from './Palette'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this._getData())
    }
  }

	render () {
		return(
      <View style={{flex: 1}}>
        <NavBar
          title='Palette'
          backHidden
          actionName='Add'
          actionFunc={() => {
            this.props.navigator.push({
              component: Palette
            })
          }}
          />
  			<ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}/>
      </View>
		)
	}

	_getData () {
    let arr = []
    for (let i = 0; i < 100; i++) {
      arr.push(i)
    }
    return arr
  }

  _renderRow (content, sectionId, index) {
    return (<View style={{height: 45}}>
        <Text>{'\titem  '}{index}</Text>
      </View>)
  }

  _renderFooter () {
    return (<Text style={{textAlign: 'center'}}>You can put any View you like here</Text>)
  }
}
