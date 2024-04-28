import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import { RestaurantInfo } from '../pages/restaurantInfo'
import { Restaurant } from '@_types/restaurant'
export default {
  title: 'Components/RestaurantInfo',
  component: RestaurantInfo,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} as Meta

export const Basic: StoryFn<Restaurant> = () => <RestaurantInfo info={info} />
const info = {
  place_name: '봉이밥',
  id: 0,
  category_name: '한식',
  distance: '100',
  phone: '010-1234-5789',
  place_url: 'https://www.naver.com',
  created_at: '',
  updated_at: '',
  x: '',
  y: '',
}
