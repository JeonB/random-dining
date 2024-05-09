import React, { useState } from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SearchRestaurantModal from '@_components/userCustomList/pages/searchRestaurantModal/searchRestaurantModal'

export default {
  title: 'Components/UserCustomList/SearchRestaurantModal',
  component: SearchRestaurantModal,

  tags: ['autodocs'],

  decorators: [Story => <Story />],
} as Meta

export const Basic: StoryFn<typeof SearchRestaurantModal> = () => {
  const [modalVisible, setModalVisible] = useState(true)
  const listItems = [
    {
      place_name: '식당',
    },
  ]
  const setListItems = () => {
    action('setListItems')
  }

  return (
    <SearchRestaurantModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      listItems={listItems}
      setListItems={setListItems}
    />
  )
}
