import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import { PositionSelector } from '../pages/positionSelector'
import { Restaurant } from '@_types/restaurant'
import { action } from '@storybook/addon-actions'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from 'src/types/navigation'
export default {
  title: 'Components/PositionSelector',
  component: PositionSelector,
  argTypes: {
    onPress: { action: '필터 화면 혹은 지도로 이동' },
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
  const mockNavigation = {
    navigate: action('navigate'),
    goBack: action('goBack'),
  } as NavigationProp<RootStackParamList>

  return <PositionSelector navigation={mockNavigation} />
}
