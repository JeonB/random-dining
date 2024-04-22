import { render, fireEvent } from '@testing-library/react-native'
import { Button } from 'react-native'
import React, { useState } from 'react'
import IncreaseButton from './increaseButton'

describe('Button Test', () => {
  it('버튼 클릭하면 숫자 1씩 증가', () => {
    // let count = 0
    // const increase = () => {
    //   count += 1
    // }
    const { getByTestId, getByText } = render(<IncreaseButton />)

    const button = getByTestId('count')

    fireEvent.press(button)
    expect(getByText('버튼 숫자 1')).toBeDefined()

    fireEvent.press(button)
    expect(getByText('버튼 숫자 2')).toBeDefined()

    fireEvent.press(button)
    expect(getByText('버튼 숫자 3')).toBeDefined()
  })
})
