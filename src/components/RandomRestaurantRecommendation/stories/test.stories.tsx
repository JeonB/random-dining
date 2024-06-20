import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import RestaurantView from '../pages/RestaurantView/restaurantView'

export default {
  title: 'Components/3R/RestaurantView/Test',
  component: RestaurantView,
  tags: ['autodocs'],
} as Meta

export const Basic: StoryFn = () => {
  return <RestaurantView />
}
