import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import SelectedRestaurantInfo from '../pages/RestaurantView/selectedRestaurantInfo'
import { RestaurantTypes } from '@_types/restaurant'
import { RootStackParamList } from 'src/types/navigation'
import { RouteProp } from '@react-navigation/native'
import { action } from '@storybook/addon-actions'
import { StackNavigationProp } from '@react-navigation/stack'

export default {
  title: 'Components/3R/RestaurantView/SelectedRestaurantInfo',
  component: SelectedRestaurantInfo,
  argTypes: {
    onPress: { action: '필터 화면 혹은 지도로 이동' },
  },
  tags: ['autodocs'],
} as Meta

export const Basic: StoryFn<RestaurantTypes> = () => {
  const mockRestaurant: RestaurantTypes = {
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
    <SelectedRestaurantInfo navigation={mockNavigation} route={mockRoute} />
  )
}
