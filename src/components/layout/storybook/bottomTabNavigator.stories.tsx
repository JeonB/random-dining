import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { Meta, StoryFn } from '@storybook/react'

import {
  BottomTabNavigator,
  BottomTabNavigatorProps,
} from '@_components/layout/component/bottomTabNavigator'
import { UserCustomList } from '@_components/userCustomList/component/userCustomList'
import { Main } from 'src/main'

export default {
  title: 'Components/BottomTabNavigator',
  component: BottomTabNavigator,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} as Meta

export const Basic: StoryFn<BottomTabNavigatorProps> = args => (
  <BottomTabNavigator {...args} />
)
Basic.args = {
  tabs: [
    {
      name: 'Random',
      component: Main,
      iconName: 'star',
    },
    {
      name: 'List',
      component: UserCustomList,
      iconName: 'list',
    },
    {
      name: 'AdInfo',
      component: UserCustomList,
      iconName: 'help',
    },
  ],
  activeTintColor: '#337ab7',
  inactiveTintColor: 'gray',
}
