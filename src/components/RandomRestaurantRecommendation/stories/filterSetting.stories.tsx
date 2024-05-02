import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import FilterSetting from '../pages/FilterSettings/filterSetting'
import { RestaurantTypes } from '@_types/restaurant'
import { action } from '@storybook/addon-actions'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from 'src/types/navigation'

export default {
  title: 'Components/FilterSettings/FilterSetting',
  component: FilterSetting,
  //   argTypes: {
  //     onPress: { action: '슬라이딩에 따른 거리조절' },
  //   },
  tags: ['autodocs'],
  //   decorators: [
  //     Story => (
  //       <View style={{ flex: 1, padding: 0, alignItems: 'center' }}>
  //         <Story />
  //       </View>
  //     ),
  //   ],
} as Meta

export const Basic: StoryFn<RestaurantTypes> = () => {
  const mockNavigation = {
    navigate: action('navigate'),
    goBack: action('goBack'),
  } as NavigationProp<RootStackParamList>
  return <FilterSetting navigation={mockNavigation} />
}
