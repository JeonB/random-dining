import { Icon, Slider } from '@rneui/themed'
import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { MyTheme } from 'theme'

interface DistanceSliderProps {
  distanceRange: number
  onDistanceChange: (value: number) => void
}

const DistanceSlider = ({
  onDistanceChange,
  distanceRange,
}: DistanceSliderProps) => {
  const handleValueChange = (value: number) => {
    onDistanceChange(value)
  }

  return (
    <View style={[styles.contentView]}>
      <Slider
        style={{
          width: Platform.select({
            android: MyTheme.width * 305,
            ios: MyTheme.width * 320,
          }),
        }}
        value={distanceRange}
        onValueChange={handleValueChange}
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
    padding: MyTheme.width * 10,
    width: MyTheme.width * 330,
    justifyContent: 'center',
    // alignItems: 'stretch',
    alignSelf: 'center',
  },
})

export default DistanceSlider
