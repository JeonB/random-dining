import React, { useState } from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ChangeSortButton } from '@_components/userCustomList/pages/searchRestaurantModal/changeSortButton'
import { View } from 'react-native'

export default {
  title: 'Components/UserCustomList/ChangeSortButton',
  component: ChangeSortButton,

  tags: ['autodocs'],

  decorators: [Story => <Story />],
} as Meta

export const Basic: StoryFn<typeof ChangeSortButton> = () => {
  const [sort, setSort] = useState('accuracy')

  const handlePress = () => {
    setSort(prevSort => (prevSort === 'accuracy' ? 'distance' : 'accuracy'))
    action('handlePress')()
  }

  return (
    <View style={{ margin: 150, alignItems: 'center' }}>
      <ChangeSortButton handlePress={handlePress} sort={sort} />
    </View>
  )
}
