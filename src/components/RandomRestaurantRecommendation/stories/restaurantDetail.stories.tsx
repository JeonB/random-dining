import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import RestaurantDetail from '../../common/unused/restaurantDetail'
import { LocationTypes } from 'src/types/restaurant'

export default {
  title: 'Components/3R/RestaurantView/RestaurantDetail',
  component: RestaurantDetail,
  tags: ['autodocs'],
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
    x: '',
    y: '',
  }

  return <RestaurantDetail info={mockRestaurant} />
}
