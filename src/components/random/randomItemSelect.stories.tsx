import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import { RandomItemSelect, Props } from './randomItemSelect'

export default {
  title: 'Components/RandomItemSelect',
  component: RandomItemSelect,
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

export const Basic: StoryFn<Props> = args => <RandomItemSelect {...args} />
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
}
