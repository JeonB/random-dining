import { render, screen, fireEvent } from '@testing-library/react-native'
import { DistanceSlider } from '../pages/FilterSettings/distanceSlider'
import { Slider } from '@rneui/themed'
import React from 'react'

interface MockSliderProps {
  onValueChange: (value: number) => void
}

// jest.mock('@rneui/themed', () => ({
//   ...jest.requireActual('@rneui/themed'),
//   Slider: ({ onValueChange }: MockSliderProps) => {
//     return (
//       <Slider testID="mock-slider" onValueChange={() => onValueChange(100)} />
//     )
//   },
// }))
describe('거리 슬라이더 테스트', () => {
  test('초기 거리 슬라이더 렌더링 테스트', () => {
    const { getByText } = render(
      <DistanceSlider
        onDistanceChange={function (value: number): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(getByText(/30m 이내/)).toBeTruthy()
  })

  test('슬라이더 값 변경에 따른 Text업데이트 확인 테스트', () => {
    const { getByTestId } = render(<DistanceSlider />)
    const slider = getByTestId('mock-slider')
    fireEvent.press(slider)
    expect(getByTestId('text').props.children).toEqual('100m 이내')
  })
})
