import React from 'react'

import {
  Animated,
  Easing,
  StyleSheet,
  View
} from 'react-native'

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 5,
    overflow: 'hidden'
  },
  fill: {
    backgroundColor: '#3b5998',
    height: 5
  }
})

export default class extends React.Component {
  static propTypes = {
    initialProgress: React.PropTypes.number,
    progress: React.PropTypes.number,
    style: View.propTypes.style,
    backgroundStyle: View.propTypes.style,
    fillStyle: View.propTypes.style,
    easingDuration: React.PropTypes.number,
    easing: React.PropTypes.func
  };

  static defaultProps = {
    easing: Easing.inOut(Easing.ease),
    easingDuration: 500
  };

  state = {
    progress: new Animated.Value(this.props.initialProgress || 0)
  };

  componentDidUpdate (prevProps, prevState) {
    if (this.props.progress >= 0 && this.props.progress !== prevProps.progress) {
      this.update()
    }
  }

  update () {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: this.props.progress
    }).start()
  }

  render () {
    const barWidth = this.props.style.width || this.state.width
    var fillWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * (barWidth), 1 * barWidth] // this.props.style.width
    })

    return (
      <View
        onLayout={event => {
          this.setState({width: event.nativeEvent.layout.width})
          console.log('currentWidth: ', event.nativeEvent.layout.width)
        }}
        style={[styles.background, this.props.backgroundStyle, this.props.style]}>
        <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]} />
      </View>
    )
  }
}
