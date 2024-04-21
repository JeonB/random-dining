import React from 'react'
import { View } from 'react-native'
import type { Meta, StoryObj } from '@storybook/react'
import IncreaseButton from './increaseButton'

const IncreaseButtonMeta: Meta<typeof IncreaseButton> = {
  title: 'Components/IncreaseButton',
  component: IncreaseButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    text: '버튼 누르면 1씩 증가',
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      '기본적인 상호작용을 위한 버튼은 이 컴포넌트를 사용합니다.',
    docs: {
      description: {
        // 추가
        component: `버튼을 누르면 1씩 증가하는게 보입니다.`,
      },
    },
  },
  decorators: [
    Story => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default IncreaseButtonMeta
export const Basic: StoryObj<typeof IncreaseButton> = {}

export const AnotherExample: StoryObj<typeof IncreaseButton> = {
  args: {
    text: 'Another example',
  },
}
