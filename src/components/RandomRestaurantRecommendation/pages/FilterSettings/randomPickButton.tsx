import React from 'react'
import { Platform } from 'react-native'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'

interface RandomPickButtonProps {
  handleRandomPickClick: () => void
  isLoading: boolean
  icon: string
  text: string
  style?: object
  labelStyle?: object
}

export const RandomPickButton = ({
  handleRandomPickClick,
  isLoading,
  icon,
  text,
  style,
  labelStyle,
}: RandomPickButtonProps) => (
  <Button
    mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
    textColor="#e6e6fA"
    icon={icon}
    buttonColor={MyTheme.colors.primary}
    onPress={handleRandomPickClick}
    disabled={isLoading}
    contentStyle={{ flexDirection: 'row-reverse' }}
    style={style}
    labelStyle={labelStyle}>
    {text}
  </Button>
)

export default RandomPickButton
