import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import SelectedRestaurantInfo from '../pages/RestaurantView/selectedRestaurantInfo'
import { LocationTypes } from '@_types/restaurant'
import { RootStackParamList } from '@_types/listParamList'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { action } from '@storybook/addon-actions'
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack'
import { RestaurantProvider } from '../pages/context/restaurantProvider'

const Stack = createStackNavigator<RootStackParamList>()
const StoryScreen = ({ route }) => {
  const Story = route.params.story
  return <Story />
}

export default {
  title: 'Components/3R/RestaurantView/SelectedRestaurantInfo',
  component: SelectedRestaurantInfo,
  argTypes: {
    onPress: { action: '필터 화면 혹은 지도로 이동' },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <RestaurantProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SelectedRestaurantInfo"
              component={StoryScreen}
              initialParams={{ story: Story }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RestaurantProvider>
    ),
  ],
} as Meta

export const Basic: StoryFn<LocationTypes> = () => {
  const mockRestaurant: LocationTypes = {
    place_name: '봉이밥',
    category_name: '한식',
    distance: '150',
    phone: '123-456-7890',
    id: 0,
    place_url: '',
    created_at: '',
    updated_at: '',
    x: '126.82597944995',
    y: '37.5676859104888',
  }

  const mockNavigation = {
    navigate: action('navigate'),
    goBack: action('goBack'),
  } as StackNavigationProp<RootStackParamList, 'SelectedRestaurantInfo'>

  const mockRoute = {
    key: 'mockKey',
    name: 'SelectedRestaurantInfo',
    params: {
      restaurant: mockRestaurant,
    },
  } as RouteProp<RootStackParamList, 'SelectedRestaurantInfo'>

  return (
    <SelectedRestaurantInfo
      route={{
        key: 'mockKey',
        name: 'SelectedRestaurantInfo',
        params: {
          restaurant: mockRestaurant,
          location: { latitude: 0, longitude: 0 },
        },
      }}
      navigation={mockNavigation}
    />
  )
}
