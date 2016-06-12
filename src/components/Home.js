import React from 'react'
import { Text, View, ScrollView, TouchableOpacity} from 'react-native'
import NavBar from 'react-native-navigationbar'
import Icon from 'react-native-vector-icons/FontAwesome'
import Palette from './Palette'
import {load} from '../reducers/localStorageReducer'
import {connect} from 'react-redux'

class Home extends React.Component {
  constructor (props) {
    super(props)
  }

  state={
    backgroundColor: 'white'
  };

  componentDidMount () {
    storage.getAllDataForKey('data')
    .then(items => {
      this.props.dispatch(load(items))
    })
  }

	render () {
		return(
      <View style={{flex: 1, backgroundColor: this.state.backgroundColor}}>
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
          <ScrollView>
            {this._renderRows()}
          </ScrollView>
      </View>
		)
	}

  _renderRows () {
    return this.props.items.map((item, index)=> 
      (<TouchableOpacity key={index} style={{height: 45, justifyContent: 'center'}}
        onPress={() => this.setState({backgroundColor: `rgba(${item.r},${item.g},${item.b},${item.a})`})}>
        <Text>time: {item.id},  r: {item.r},  g: {item.g},  b: {item.b},  a: {item.a}</Text>
      </TouchableOpacity>)
    )
  }

  _renderFooter () {
    return (<Text style={{textAlign: 'center'}}>You can put any View you like here</Text>)
  }
}

export default connect(state => ({items: state.items}))(Home)
