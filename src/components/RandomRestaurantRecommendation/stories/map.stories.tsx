import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import { Map, MapProps } from '../components/map'
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

export const Basic: StoryFn<MapProps> = args => <Map {...args} />
Basic.args = {
  info: {
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
  },
}
