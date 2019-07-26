/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, PanResponder, Dimensions } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  translateY = new Animated.Value(0);

  translateL1Y = new Animated.Value(0);
  translateL1X = new Animated.Value(0);
  translateL2X = new Animated.Value(0);
  translateL2Y = new Animated.Value(0);

  translateR1Y = new Animated.Value(0);
  translateR1X = new Animated.Value(0);
  translateR2X = new Animated.Value(0);
  translateR2Y = new Animated.Value(0);

  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([null, { dy: this.translateY }], { listener: this._customListener.bind(this) }),
    onPanResponderRelease: (e, { vy, dy }) => {
      const screenHeight = Dimensions.get("window").height;
      if (Math.abs(vy) >= 0.5 || Math.abs(dy) >= 0.5 * screenHeight) {
        // Now button
        Animated.timing(this.translateY, {
          toValue: screenHeight,
          duration: 200
        }).start(this.props.onDismiss);

        // Left 1 Icon
        this.timingAnimation(this.translateL1X, -screenHeight);
        this.timingAnimation(this.translateL1Y, screenHeight);

        // Left 2 Icon
        this.timingAnimation(this.translateL2X, -screenHeight);
        this.timingAnimation(this.translateL2Y, screenHeight);

        // Right 1 Icon
        this.timingAnimation(this.translateR1X, screenHeight);
        this.timingAnimation(this.translateR1Y, screenHeight);

        // Right 2 Icon
        this.timingAnimation(this.translateR2X, screenHeight);
        this.timingAnimation(this.translateR2Y, screenHeight);

      } else {
        // NOW button
        Animated.spring(this.translateY, {
          toValue: 0,
          bounciness: 10
        }).start();

        // Left 1 Icon
        this.springAnimation(this.translateL1X);
        this.springAnimation(this.translateL1Y);

        // Left 2 Icon
        this.springAnimation(this.translateL2X);
        this.springAnimation(this.translateL2Y);

        // Right 1 Icon
        this.springAnimation(this.translateR1X);
        this.springAnimation(this.translateR1Y);

        // Right 2 Icon
        this.springAnimation(this.translateR2X);
        this.springAnimation(this.translateR2Y);

      }
    }
  });

  timingAnimation(animated, toValue) {
    Animated.timing(animated, {
        toValue: toValue,
        duration: 200
      }).start(this.props.onDismiss);
  }

  springAnimation(animated) {
    Animated.spring(animated, {
      toValue: 0,
      bounciness: 10
    }).start();
  }

  _customListener(e, gestureState){
    this.translateL1X.setValue(gestureState.dy/1.5)
    this.translateL1Y.setValue(-gestureState.dy/1.5)
    this.translateL2X.setValue(gestureState.dy)
    this.translateL2Y.setValue(-gestureState.dy)

    this.translateR1Y.setValue(-gestureState.dy)
    this.translateR1X.setValue(-gestureState.dy)
    this.translateR2X.setValue(-gestureState.dy/1.5)
    this.translateR2Y.setValue(-gestureState.dy/1.5)
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.absolute}>
          <Animated.View style={[styles.actionButton, { transform: [{translateX: this.translateL1X }, { translateY: this.translateL1Y}] }]}>
            <Text style={styles.nowButtonText}>L1</Text>
          </Animated.View>
          <Animated.View style={[styles.actionButton, { transform: [{translateX: this.translateL2X }, { translateY: this.translateL2Y}] }]}>
            <Text style={styles.nowButtonText}>L2</Text>
          </Animated.View>
          <Animated.View style={[styles.bottomMenu, { transform: [{ translateY: this.translateY }] }]} {...this._panResponder.panHandlers}>
            <View style={styles.nowButton}>
              <Text style={styles.nowButtonText}>NOW</Text>
            </View>
          </Animated.View>
          <Animated.View style={[styles.actionButton, { transform: [{translateX: this.translateR1X }, { translateY: this.translateR1Y}] }]}>
            <Text style={styles.nowButtonText}>R1</Text>
          </Animated.View>
          <Animated.View style={[styles.actionButton, { transform: [{translateX: this.translateR2X }, { translateY: this.translateR2Y}] }]}>
            <Text style={styles.nowButtonText}>R2</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    bottom: "3%",
    width: "100%",
    flexDirection: 'row',
    justifyContent: "space-evenly",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  bottomMenu: {
  },
  nowButton: {
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 180,
    backgroundColor: '#e46e37',
    height: 70,
    width: 70,
    alignSelf: "center",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#232B41',
    height: 40,
    width: 40,
    alignSelf: "center",
  },
  nowButtonText: {
    color: 'white'
  }
});
