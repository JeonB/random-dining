import React from 'react'
import { Button } from 'react-native-paper'

interface RandomPickButtonProps {
  handleRandomPickClick: () => void
  isLoading: boolean
  icon: string
  text: string
  style?: object
}

const RandomPickButton = ({
  handleRandomPickClick,
  isLoading,
  icon,
  text,
  style,
}: RandomPickButtonProps) => (
  <Button
    labelStyle={{
      fontSize: 18,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    mode="elevated"
    textColor="#e6e6fA"
    icon={icon}
    buttonColor="#FF5733"
    onPress={handleRandomPickClick}
    disabled={isLoading}
    contentStyle={{ flexDirection: 'row-reverse' }}
    style={style}>
    {text}
  </Button>
)

export default RandomPickButton
