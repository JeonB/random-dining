import React from 'react'
import { View } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'
import { NavigationContainer } from '@react-navigation/native'

import { ListManageIcon } from '@_components/userCustomList/component/listManageIcon'

const ListManageIconMeta: Meta<typeof ListManageIcon> = {
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
}

export default ListManageIconMeta
export const Basic: StoryObj<typeof ListManageIcon> = {}
