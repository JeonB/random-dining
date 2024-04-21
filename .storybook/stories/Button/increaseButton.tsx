import React, { useState } from 'react'
import { Button } from 'react-native'

const IncreaseButton = () => {
  const [count, setCount] = useState(0)

  const increase = () => {
    setCount(count + 1)
  }

  return <Button title={`버튼 숫자 ${count}`} onPress={increase} />
}

export default IncreaseButton
