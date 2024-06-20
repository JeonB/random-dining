import React, { memo, useCallback, useMemo } from 'react'
import { Icon, Slider } from '@rneui/themed'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { useStore } from '@_common/utils/zustandStore'
import { MyTheme } from 'theme'

export const DistanceSlider = memo(() => {
  const distanceRange = useStore(state => state.distance)
  const onDistancheChange = useStore(state => state.setDistance)

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
        onValueChange={onDistancheChange}
        maximumValue={1000}
        minimumValue={100}
        step={100}
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
})
const styles = StyleSheet.create({
  contentView: {
    padding: MyTheme.width * 10,
    width: MyTheme.width * 330,
    justifyContent: 'center',
    // alignItems: 'stretch',
    alignSelf: 'center',
  },
})
DistanceSlider.displayName = 'DistanceSlider'
export default DistanceSlider
