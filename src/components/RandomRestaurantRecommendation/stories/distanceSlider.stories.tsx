import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import DistanceSlider from '../pages/FilterSettings/distanceSlider'
import { LocationTypes } from '@_types/restaurant'

export default {
  title: 'Components/3R/FilterSettings/DistanceSlider',
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

export const Basic: StoryFn<LocationTypes> = () => {
  interface DistanceSliderProps {
    onDistanceChange: (value: number) => void
  }
  function onDistanceChange(value: number): void {
    console.log('Distance changed:', value)
  }
  return (
    <DistanceSlider onDistanceChange={onDistanceChange} distanceRange={100} />
  )
}
