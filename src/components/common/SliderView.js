import { Slider } from '@miblanchard/react-native-slider';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

const SliderView = () => {
  const [distValue, setDistValue] = useState(5);

  return (
    <Slider
      containerStyle={{ marginHorizontal: 16, marginBottom: 12 }}
      trackStyle={{ height: 6 }}
      thumbStyle={styles.thumbStyle}
      value={distValue}
      step={10}
      minimumValue={0}
      maximumValue={200}
      onValueChange={(value) => setDistValue(value[0])}
      thumbTintColor="#DAA520"
      minimumTrackTintColor="#DAA520"
      maximumTrackTintColor="lightgrey"
      animateTransitions
      animationType="spring"
      renderAboveThumbComponent={() => (
        <Text style={[styles.thumbText, { right: distValue }]}>
          {(distValue / 10).toFixed(0)} km
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  thumbStyle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 8,
    // backgroundColor: '#54D3C2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  thumbText: { width: 170, textAlign: 'center' },
});

export default SliderView;
