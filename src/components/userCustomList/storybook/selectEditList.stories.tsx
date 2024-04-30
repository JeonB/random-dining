import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { SelectEditList } from '@_components/userCustomList/component/selectEditList'

const SelectEditListMeta: Meta<typeof SelectEditList> = {
  title: 'Components/UserCustomList/SelectEditList',
  component: SelectEditList,

  tags: ['autodocs'],

  decorators: [Story => <Story />],
}

export default SelectEditListMeta
export const Basic: StoryObj<typeof SelectEditList> = {}
