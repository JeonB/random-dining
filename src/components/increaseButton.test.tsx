import { render, fireEvent } from '@testing-library/react-native'
import { Button } from 'react-native'
import React from 'react'

describe('Button Test', () => {
  it('버튼 클릭하면 숫자 1씩 증가', () => {
    let count = 0
    const increase = () => {
      count += 1
    }

    const { getByText } = render(<Button title="Increase" onPress={increase} />)

    fireEvent.press(getByText('Increase'))
    expect(count).toBe(1)

    fireEvent.press(getByText('Increase'))
    expect(count).toBe(2)

    fireEvent.press(getByText('Increase'))
    expect(count).toBe(3)
  })
})
