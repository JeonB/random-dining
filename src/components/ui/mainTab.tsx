import React from 'react'

import { BottomTabNavigator } from '@_components/layout/component/bottomTabNavigator'

import { Main } from 'src/main'
import { UserCustomList } from '@_components/userCustomList/component/userCustomList'

const tabs = [
  {
    name: 'random',
    component: Main,
    iconName: 'star',
  },
  {
    name: 'UserCustomList',
    component: UserCustomList,
    iconName: 'list',
  },
  {
    name: 'AdInfo',
    component: UserCustomList,
    iconName: 'help',
  },
]

export const MainTab: React.FC = () => {
  return (
    <BottomTabNavigator
      tabs={tabs}
      activeTintColor="#337ab7"
      inactiveTintColor="gray"
    />
  )
}
