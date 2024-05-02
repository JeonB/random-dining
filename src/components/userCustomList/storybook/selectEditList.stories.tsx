import React from 'react'

import type { Meta, StoryFn } from '@storybook/react'
import { NavigationContainer, NavigationProp } from '@react-navigation/native'
import { action } from '@storybook/addon-actions'

import { RootStackParamList } from '@_types/navigation'
import { SelectEditList } from '@_components/userCustomList/pages/selectEditList'

export default {
  title: 'Components/UserCustomList/SelectEditList',
  component: SelectEditList,

  tags: ['autodocs'],

  decorators: [
    Story => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} as Meta

export const Basic: StoryFn<typeof SelectEditList> = () => {
  const mockNavigation = {
    navigate: action('navigate'),
  } as NavigationProp<RootStackParamList>

  return <SelectEditList navigation={mockNavigation} />
}
