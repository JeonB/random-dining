import React from 'react'

import type { Meta, StoryFn } from '@storybook/react'
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native'
import { action } from '@storybook/addon-actions'

import { RootStackParamList } from '@_types/navigation'
import { EditUserList } from '@_userListPages/editUserList'

export default {
  title: 'Components/UserCustomList/EditUserList',
  component: EditUserList,

  tags: ['autodocs'],

  decorators: [
    Story => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} as Meta

export const Basic: StoryFn<typeof EditUserList> = () => {
  const mockNavigation = {
    navigate: action('navigate'),
  } as NavigationProp<RootStackParamList>

  const mockRoute = {
    params: {
      listName: 'Test List',
    },
  } as RouteProp<RootStackParamList, 'EditUserList'>

  return <EditUserList navigation={mockNavigation} route={mockRoute} />
}
