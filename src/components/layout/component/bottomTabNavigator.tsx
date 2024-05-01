import React, { useMemo } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/themed'

const Tab = createBottomTabNavigator()

const renderTabIcon = (
  color: string,
  size: number,
  route: { name: string },
  tabs: Record<string, TabInfo>,
) => {
  const tabInfo = tabs[route.name]
  if (tabInfo) {
    return <Icon name={tabInfo.iconName} size={size} color={color} />
  }
}

export const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  tabs,
  activeTintColor,
  inactiveTintColor,
}) => {
  const tabsByName = useMemo(() => {
    return tabs.reduce((acc, tab) => ({ ...acc, [tab.name]: tab }), {})
  }, [tabs])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) =>
          renderTabIcon(color, size, route, tabsByName),
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        // headerShown: false,
      })}>
      {tabs.map(({ name, component, listeners }) => (
        <Tab.Screen
          name={name}
          component={component}
          listeners={listeners}
          key={name}
        />
      ))}
    </Tab.Navigator>
  )
}

export interface TabInfo {
  name: string
  component: React.ComponentType
  iconName: string
  listeners?: React.ComponentProps<typeof Tab.Screen>['listeners']
}

export interface BottomTabNavigatorProps {
  tabs: TabInfo[]
  activeTintColor: string
  inactiveTintColor: string
}
