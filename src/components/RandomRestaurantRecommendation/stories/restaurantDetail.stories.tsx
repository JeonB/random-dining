import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { RestaurantDetail } from '../pages/RestaurantView/restaurantDetail'
import { Restaurant } from 'src/types/restaurant'

export default {
  title: 'Components/RestaurantDetail',
  component: RestaurantDetail,
  tags: ['autodocs'],
} as Meta

export const Basic: StoryFn<Restaurant> = () => {
  const mockRestaurant: Restaurant = {
    place_name: '봉이밥',
    category_name: '한식',
    distance: '150',
    phone: '123-456-7890',
    id: 0,
    place_url: '',
    created_at: '',
    updated_at: '',
    x: '',
    y: '',
  }

  return <RestaurantDetail info={mockRestaurant} />
}
