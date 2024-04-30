import React from 'react'
import { View } from 'react-native'

import type { Meta, StoryFn } from '@storybook/react'
import { NavigationContainer } from '@react-navigation/native'
import { NavigationProp } from '@react-navigation/native'
import { action } from '@storybook/addon-actions'

import { RootStackParamList } from '@_types/navigation'
import { ListManageIcon } from '@_components/userCustomList/component/listManageIcon'

export default {
  title: 'Components/UserCustomList/ListManageIcon',
  component: ListManageIcon,

  tags: ['autodocs'],

  decorators: [
    Story => (
      <NavigationContainer>
        <View style={{ flex: 1, padding: 50, justifyContent: 'center' }}>
          <Story />
        </View>
      </NavigationContainer>
    ),
  ],
} as Meta

export const Basic: StoryFn<typeof ListManageIcon> = () => {
  const mockNavigation = {
    navigate: action('navigate'),
  } as NavigationProp<RootStackParamList>

  return <ListManageIcon navigation={mockNavigation} />
}
