import { Icon, Slider } from '@rneui/themed'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const DistanceSlider = () => {
  const [distanceRange, setDistanceRange] = useState(30)
  return (
    <View style={[styles.contentView]}>
      <Slider
        value={distanceRange}
        onValueChange={setDistanceRange}
        maximumValue={300}
        minimumValue={30}
        step={10}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
        thumbProps={{
          children: (
            <Icon
              type="material-community"
              size={15}
              reverse
              containerStyle={{ bottom: 15, right: 10 }}
              name={'food'}
            />
          ),
        }}
      />
      <Text>{distanceRange}m 이내</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  contentView: {
    padding: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'center',
  },
})
