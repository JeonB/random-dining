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
    'item1',
    'item2',
    'item3',
    'item4',
    'item5',
    'item6',
    'item7',
    'item8',
    'item9',
    'item10',
  ],
  onItemChange: () => {},
  itemHeight: 50,
  setTimeoutFunc: () => {},
}
