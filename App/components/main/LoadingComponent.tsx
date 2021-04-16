import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator, Animated} from 'react-native';
import Constants from '../../config';
import DeviceUiInfo from '../../config/device';
import MyAppText from './MyAppText';

interface Props {
  loading: boolean;
}

const LoadingComponent: FC<Props> = props => {
  const [animatedOpacity] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 500,
      extrapolate: 'clamp',
      useNativeDriver: true,
    }).start();
  }, [props.loading]);

  return props.loading ? (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animatedOpacity,
        },
      ]}>
      <View style={styles.opacityContianer} />
      <MyAppText>Loading ...</MyAppText>
      <ActivityIndicator size="large" color={Constants.colors.secondary} />
    </Animated.View>
  ) : null;
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: Constants.layout.padding / 2,
    marginBottom: Constants.layout.padding / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opacityContianer: {
    borderRadius: DeviceUiInfo.scale(15),
    backgroundColor: Constants.colors.white,
    opacity: 0.3,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
