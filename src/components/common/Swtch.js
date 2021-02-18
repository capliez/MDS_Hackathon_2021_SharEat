// import _ from 'lodash';
import React, { Component } from 'react';
import {
  Animated,
  Easing, StyleSheet, TouchableOpacity
} from 'react-native';

const INNER_PADDING = 2;
const DEFAULT_WIDTH = 50;
const DEFAULT_HEIGHT = 30;
const DEFAULT_THUMB_SIZE = 26;

/**
 * Switch component for toggling boolean value related to some context
 */
class Switch extends Component {

  state = {
    thumbPosition: new Animated.Value(this.props.value ? 1 : 0),
  };

  styles = createStyles(this.props);

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      this.toggle(value);
    }
  }

  getAccessibilityProps() {
    const { disabled, value } = this.props;

    return {
      accessible: true,
      accessibilityRole: 'switch',
      accessibilityStates: disabled
        ? ['disabled']
        : value
        ? ['checked']
        : ['unchecked'],
      accessibilityValue: { text: value ? '1' : '0' },
    };
  }

  toggle(value) {
    const { thumbPosition } = this.state;

    Animated.timing(thumbPosition, {
      toValue: value ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.77, 0.0, 0.175, 1.0),
      useNativeDriver: true,
    }).start();
  }

  onPress = () => {
    const { disabled } = this.props;

    if (!disabled) {
      //   _.invoke(this.props, 'onValueChange', !this.props.value);
      this.props.onValueChange && this.props.onValueChange(!this.props.value);
    }
  };

  calcThumbOnPosition() {
    const props = this.props;
    const width = props.width || DEFAULT_WIDTH;
    const thumbSize = props.thumbSize || DEFAULT_THUMB_SIZE;
    let position = width - (2 * INNER_PADDING + thumbSize);
    // position *= Constants.isRTL ? -1 : 1;
    return position;
  }

  getSwitchStyle() {
    const {
      value,
      onColor,
      offColor,
      style: propsStyle,
      disabled,
      disabledColor,
    } = this.props;
    const style = [this.styles.switch];

    if (disabled) {
      style.push(
        disabledColor
          ? { backgroundColor: disabledColor }
          : this.styles.switchDisabled,
      );
    } else if (value) {
      style.push(onColor ? { backgroundColor: onColor } : this.styles.switchOn);
    } else {
      style.push(
        offColor ? { backgroundColor: offColor } : this.styles.switchOff,
      );
    }

    style.push(propsStyle);
    return style;
  }

  renderThumb() {
    const { thumbStyle } = this.props;
    const { thumbPosition } = this.state;

    const interpolatedTranslateX = thumbPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.calcThumbOnPosition()],
    });

    const thumbPositionStyle = {
      transform: [{ translateX: interpolatedTranslateX }],
    };

    return (
      <Animated.View
        style={[this.styles.thumb, thumbPositionStyle, thumbStyle]}
      />
    );
  }

  render() {
    return (
      // @ts-ignore
      <TouchableOpacity
        activeOpacity={1}
        style={this.getSwitchStyle()}
        onPress={this.onPress}
      >
        {this.renderThumb()}
      </TouchableOpacity>
    );
  }
}

function createStyles({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  onColor = '#DAA520',
  offColor = 'lightgrey',
  disabledColor = 'lightgrey',
  thumbColor = 'white',
  thumbSize = DEFAULT_THUMB_SIZE,
}) {
  return StyleSheet.create({
    switch: {
      width,
      height,
      borderRadius: 999,
      justifyContent: 'center',
      padding: INNER_PADDING,
    },
    switchOn: {
      backgroundColor: onColor,
    },
    switchOff: {
      backgroundColor: offColor,
    },
    switchDisabled: {
      backgroundColor: disabledColor,
    },
    thumb: {
      width: thumbSize,
      height: thumbSize,
      borderRadius: thumbSize / 2,
      backgroundColor: thumbColor,
    },
  });
}

export default Switch;
