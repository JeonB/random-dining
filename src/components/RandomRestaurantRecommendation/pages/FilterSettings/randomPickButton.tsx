import React from 'react'
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

const RandomPickButton = ({
  handleRandomPickClick,
  isLoading,
  icon,
  text,
  style,
  labelStyle,
}: RandomPickButtonProps) => (
  <Button
    mode="elevated"
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
