import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import { Map } from '../pages/RestaurantView/map'
import { RestaurantTypes } from 'src/types/restaurant'
export default {
  title: 'Components/Map',
  component: Map,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} as Meta

export const Basic: StoryFn<RestaurantTypes> = () => <Map info={info} />
const info = {
  place_name: 'Restaurant 1',
  id: 0,
  category_name: '',
  distance: '',
  phone: '',
  place_url: '',
  created_at: '',
  updated_at: '',
  x: '126.82597944995',
  y: '37.5676859104888',
} as RestaurantTypes
