import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Slider,
  View
} from 'react-native'

class SliderOriginal extends Component {
  static propTypes = {
    label: React.PropTypes.string,
    exportValue: React.PropTypes.func,
    fixNum: React.PropTypes.number,
    ...Slider.propTypes
  };

  static defaultProps = {
    value: 0,
    fixNum: 0,
    currentPercent: 0.5
  };

  state = {
    value: this.props.value
  }

  render () {
    return (
      <View style={styles.slider}>
        <Text>{this.props.label + ':'}</Text>
        <Text style={styles.value}>{this.state.value.toFixed(this.props.fixNum)}</Text>
        <Slider
          style={{flex: 1}}
          {...this.props}
          maximumValue={this.props.maximumValue || 255}
          onValueChange={value => {
            this.setState({value})
            this.props.exportValue(value)
          }} />
      </View>
    )
  }
}

export default class extends Component {
  // r g b: 0-255, a: 0-1
  state = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.5
  };

  static propTypes = {
    currentPercent: React.PropTypes.number
  };

  static defaultProps = {
    currentPercent: 0
  }

  render () {
    let currentPercent = (this.props.currentPercent * 100).toFixed() + '%'
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={[styles.circle,
            {backgroundColor: `rgba(${this.state.r},${this.state.g},${this.state.b},${this.state.a})`}]}>
            <Text style={styles.title}>{'Color Palette\n' + currentPercent}</Text>
          </View>
        </View>
        <View style={styles.palette}>
          <SliderOriginal label='R'
            minimumTrackTintColor={`rgba(${this.state.r}, 0, 0, 1)`}
            exportValue={value => this.setState({r: value})} />
          <SliderOriginal label='G'
            minimumTrackTintColor={`rgba(0, ${this.state.g}, 0, 1)`}
            exportValue={value => this.setState({g: value})} />
          <SliderOriginal label='B'
            minimumTrackTintColor={`rgba(0, 0, ${this.state.b}, 1)`}
            exportValue={value => this.setState({b: value})} />
          <SliderOriginal
            label='A'
            fixNum={2}
            value={0.5}
            maximumValue={1}
            minimumTrackTintColor={`rgba(0, 0, 0, ${this.state.a})`}
            exportValue={value => this.setState({a: value})} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  circle: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    borderRadius: 100
  },
  palette: {
    flex: 1,
    margin: 30,
    marginTop: 0
  },
  slider: {
    height: 20,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  value: {
    width: 40,
    textAlign: 'center'
  }
})
