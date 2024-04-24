import React from 'react'
import { Alert, Text, View } from 'react-native'

import { Meta, StoryFn } from '@storybook/react'

import {
  DefaultFlatList,
  FlatListProps,
} from '@_components/layout/component/defaultFlatList'

export default {
  title: 'Components/DefaultFlatList',
  component: DefaultFlatList,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 50 }}>
        <Story />
      </View>
    ),
  ],
} as Meta

export const BasicList: StoryFn<FlatListProps> = args => (
  <DefaultFlatList {...args} />
)
BasicList.args = {
  data: ['list1', 'list2'],
  keyExtractor: (item, index) => index.toString(),
  renderItem: item => <Text>{item}</Text>,
}

export const ListWithItemPress: StoryFn<FlatListProps> = args => (
  <DefaultFlatList {...args} />
)
ListWithItemPress.args = {
  ...BasicList.args,
  onPressItem: () => Alert.alert('Item pressed!'),
}
