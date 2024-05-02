import React from 'react'

import type { Meta, StoryFn } from '@storybook/react'

import { AddUserListModal } from '@_components/userCustomList/pages/addUserListModal'

export default {
  title: 'Components/UserCustomList/AddUserListModal',
  component: AddUserListModal,

  tags: ['autodocs'],

  decorators: [Story => <Story />],
} as Meta

export const Basic: StoryFn<typeof AddUserListModal> = () => {
  return <AddUserListModal place_name={'place name'} />
}
