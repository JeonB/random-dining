import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { MyButton } from './Button';

const MyButtonMeta: Meta<typeof MyButton> = {
  title: 'MyButton',
  component: MyButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    text: 'Hello world',
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // 추가
    componentSubtitle:
      '기본적인 상호작용을 위한 버튼은 이 컴포넌트를 사용합니다.',
    docs: {
      description: {
        // 추가
        component: `type올 조절해 submit 버튼으로 활용도 가능하나 useForm을 사용한다면 SubmitButton이 따로 존재합니다.`,
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
};

export default MyButtonMeta;

export const Basic: StoryObj<typeof MyButton> = {};

export const AnotherExample: StoryObj<typeof MyButton> = {
  args: {
    text: 'Another example',
  },
};
