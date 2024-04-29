// RandomPickButton.tsx
import React from 'react'
import { Button } from 'react-native-paper'

interface RandomPickButtonProps {
  handleRandomPickClick: () => void
  isLoading: boolean
  text: string
}

const RandomPickButton = ({
  handleRandomPickClick,
  isLoading,
  text,
}: RandomPickButtonProps) => (
  <Button
    labelStyle={{ fontSize: 20 }}
    mode="elevated"
    textColor="#272729"
    icon="chat-question-outline"
    buttonColor="lightskyblue"
    onPress={handleRandomPickClick}
    disabled={isLoading}
    contentStyle={{ flexDirection: 'row-reverse' }}>
    {text}
  </Button>
)

export default RandomPickButton
