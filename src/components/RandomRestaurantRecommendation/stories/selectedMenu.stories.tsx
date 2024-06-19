import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import { SelectedMenu } from '../../RandomRestaurantRecommendation/pages/FilterSettings/selectedMenu'
import { RestaurantParamList } from '@_types'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { action } from '@storybook/addon-actions'
import { StackNavigationProp } from '@react-navigation/stack'

export default {
  title: 'Components/3R/RestaurantView/FilterSetting/SelectedMenu',
  component: SelectedMenu,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} as Meta

export const Basic: StoryFn = () => {
  const mockNavigation = {
    navigate: action('navigate'),
    goBack: action('goBack'),
  } as StackNavigationProp<RestaurantParamList, 'SelectedMenu', undefined>

  const mockRoute = {
    key: 'mockKey',
    name: 'SelectedMenu',
    params: {
      items: ['item1', 'item2', 'item3'],
    },
  } as RouteProp<RestaurantParamList, 'SelectedMenu'>

  return <SelectedMenu navigation={mockNavigation} route={mockRoute} />
}
