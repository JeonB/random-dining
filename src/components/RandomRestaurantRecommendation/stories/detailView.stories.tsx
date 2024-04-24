import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import { DetailView } from '../components/detailView'

export default {
  title: 'Components/DetailView',
  component: DetailView,
  //   argTypes: {
  //     onPress: { action: 'pressed the button' },
  //   },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} as Meta

const Template: StoryFn<{ url: string }> = args => <DetailView {...args} />

export const Basic = Template.bind({})
Basic.args = {
  url: 'https://www.google.com',
}
// Basic.args = {
//   items: [
//     {
//       place_name: 'Restaurant 1',
//       id: 0,
//       category_name: '',
//       distance: '',
//       phone: '',
//       place_url: '',
//       created_at: '',
//       updated_at: '',
//       x: '',
//       y: '',
//     },
//     {
//       place_name: 'Restaurant 2',
//       id: 0,
//       category_name: '',
//       distance: '',
//       phone: '',
//       place_url: '',
//       created_at: '',
//       updated_at: '',
//       x: '',
//       y: '',
//     },
//     {
//       place_name: 'Restaurant 3',
//       id: 0,
//       category_name: '',
//       distance: '',
//       phone: '',
//       place_url: '',
//       created_at: '',
//       updated_at: '',
//       x: '',
//       y: '',
//     },
//   ],
//   onIndexChange: () => {},
//   itemHeight: 50,
// }
