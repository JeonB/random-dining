import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import PositionSelector from '../pages/positionSelector'
import { LocationTypes, RootStackParamList } from '@_types'
import { action } from '@storybook/addon-actions'
import { NavigationProp } from '@react-navigation/native'
export default {
  title: 'Components/3R/PositionSelector',
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

export const Basic: StoryFn<LocationTypes> = () => {
  return <PositionSelector />
}
