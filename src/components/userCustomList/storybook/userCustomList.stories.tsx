import React from 'react'

import type { Meta, StoryFn } from '@storybook/react'
import { NavigationContainer, NavigationProp } from '@react-navigation/native'
import { action } from '@storybook/addon-actions'
import { createStackNavigator } from '@react-navigation/stack'

import { RootStackParamList } from '@_types/navigation'
import { UserCustomList } from '@_components/userCustomList/pages/userCustomList'
import { RestaurantParamList } from '@_types/restaurantParamList'
const Stack = createStackNavigator()

export default {
  title: 'Components/UserCustomList/UserCustomList',
  component: UserCustomList,

  tags: ['autodocs'],

  decorators: [
    Story => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} as Meta

export const Basic: StoryFn<typeof UserCustomList> = () => {
  const mockNavigation = {
    navigate: action('navigate'),
  } as NavigationProp<RestaurantParamList>
  const navigation = {
    navigate: action('navigate'),
  } as NavigationProp<RootStackParamList>
  return (
    <UserCustomList
      // restaurantNavigation={mockNavigation}
      navigation={navigation}
    />
  )
}
