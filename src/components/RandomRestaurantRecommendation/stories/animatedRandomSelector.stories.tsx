import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import {
  AnimatedRandomSelector,
  Props,
} from '../../common/ui/animatedRandomSelector'

export default {
  title: 'Components/3R/RestaurantView/RandomItemSelect',
  component: AnimatedRandomSelector,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} as Meta

export const Basic: StoryFn<Props> = args => (
  <AnimatedRandomSelector {...args} />
)
Basic.args = {
  items: [
    {
      place_name: 'Restaurant 1',
      id: 0,
      category_name: '',
      distance: '',
      phone: '',
      place_url: '',
      created_at: '',
      updated_at: '',
      x: '',
      y: '',
    },
    {
      place_name: 'Restaurant 2',
      id: 0,
      category_name: '',
      distance: '',
      phone: '',
      place_url: '',
      created_at: '',
      updated_at: '',
      x: '',
      y: '',
    },
    {
      place_name: 'Restaurant 3',
      id: 0,
      category_name: '',
      distance: '',
      phone: '',
      place_url: '',
      created_at: '',
      updated_at: '',
      x: '',
      y: '',
    },
  ],
  onIndexChange: () => {},
  itemHeight: 50,
  setTimeoutFunc: () => {},
}
