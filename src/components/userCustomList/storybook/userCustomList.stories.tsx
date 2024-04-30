import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { UserCustomList } from '@_components/userCustomList/component/userCustomList'
import { SelectEditList } from '@_components/userCustomList/component/selectEditList'

const Stack = createStackNavigator()

const UserCustomListMeta: Meta<typeof UserCustomList> = {
  title: 'Components/UserCustomList/UserCustomList',
  component: UserCustomList,

  tags: ['autodocs'],

  decorators: [
    Story => (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UserCustomList">
          <Stack.Screen name="UserCustomList" component={Story} />
          <Stack.Screen name="SelectEditList" component={SelectEditList} />
        </Stack.Navigator>
      </NavigationContainer>
    ),
  ],
}

export default UserCustomListMeta
export const Basic: StoryObj<typeof UserCustomList> = {}
