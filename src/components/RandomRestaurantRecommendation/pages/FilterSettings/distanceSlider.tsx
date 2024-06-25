import React, { memo, useCallback, useState } from 'react'
import { Icon, Slider } from '@rneui/themed'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { useStore } from '@_common/utils/zustandStore'
import { MyTheme } from 'theme'

export const DistanceSlider = () => {
  const [localDistance, setLocalDistance] = useState(
    useStore(state => state.distance),
  )
  const setDistance = useStore(state => state.setDistance)

  const handleChange = (value: number) => {
    setLocalDistance(value)
  }

  //사용자가 슬라이더를 놓을 때만 전역 상태를 업데이트
  const handleComplete = (value: number) => {
    setDistance(value)
  }
  return (
    <View style={styles.contentView}>
      <Slider
        style={{
          width: Platform.select({
            android: MyTheme.width * 305,
            ios: MyTheme.width * 320,
          }),
        }}
        value={localDistance}
        onValueChange={handleChange}
        onSlidingComplete={handleComplete}
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
      <Text>{localDistance}m 이내</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  contentView: {
    padding: MyTheme.width * 10,
    width: MyTheme.width * 330,
    justifyContent: 'center',
    alignSelf: 'center',
  },
})

export default memo(DistanceSlider)
