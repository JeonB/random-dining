import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import { DistanceSlider } from '../pages/FilterSettings/distanceSlider'
import { Restaurant } from '@_types/restaurant'
import { action } from '@storybook/addon-actions'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from 'src/types/navigation'
export default {
  title: 'Components/FilterSettings/DistanceSlider',
  component: DistanceSlider,
  argTypes: {
    onPress: { action: '슬라이딩에 따른 거리조절' },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 50, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
} as Meta

export const Basic: StoryFn<Restaurant> = () => {
  interface DistanceSliderProps {
    onDistanceChange: (value: number) => void
  }
  function onDistanceChange(value: number): void {
    console.log('Distance changed:', value)
  }
  return <DistanceSlider onDistanceChange={onDistanceChange} />
}
