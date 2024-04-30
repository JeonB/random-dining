import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import ToggleSwitch from '../../common/toggleSwitch'
import { Restaurant } from 'src/types/restaurant'
export default {
  title: 'Components/CategorySwitch',
  component: ToggleSwitch,
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
  return <ToggleSwitch />
}
