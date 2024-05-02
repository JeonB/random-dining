import React from 'react'

import type { Meta, StoryFn } from '@storybook/react'
import { NavigationContainer, NavigationProp } from '@react-navigation/native'
import { action } from '@storybook/addon-actions'

import { RootStackParamList } from '@_types/navigation'
import { AddUserList } from '@_components/userCustomList/pages/addUserList'

export default {
  title: 'Components/UserCustomList/AddUserList',
  component: AddUserList,

  tags: ['autodocs'],

  decorators: [
    Story => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} as Meta

export const Basic: StoryFn<typeof AddUserList> = () => {
  const mockNavigation = {
    navigate: action('navigate'),
  } as NavigationProp<RootStackParamList>

  return <AddUserList navigation={mockNavigation} />
}
