import React from 'react'
import { View } from 'react-native'
import { Meta, StoryFn } from '@storybook/react'
import { DetailView } from '../components/detailView'

export default {
  title: 'Components/DetailView',
  component: DetailView,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} as Meta

const Template: StoryFn<{ url: string }> = args => <DetailView />

export const Basic = Template.bind({})
Basic.args = {
  url: 'https://www.google.com',
}
