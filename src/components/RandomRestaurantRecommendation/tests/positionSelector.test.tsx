import React from 'react'
import { PositionSelector } from '../pages/positionSelector'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from 'src/types/navigation'
describe('postionSelector', () => {
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  } as unknown as NavigationProp<RootStackParamList>
  test('렌더링 테스트', () => {
    render(<PositionSelector navigation={navigation} />)
    const mediaContainer = screen.getByTestId('mediaContainer')
    expect(mediaContainer).toBeTruthy()
  })
  test('내 위치에서 찾기 버튼 클릭 시 navigate 호출', () => {
    render(<PositionSelector navigation={navigation} />)
    const button = screen.getByText('내 위치에서 찾기')
    fireEvent.press(button)
    expect(navigation.navigate).toHaveBeenCalledWith('Main')
  })
  test('지도에서 찾기 버튼 클릭 시 navigate 호출', () => {
    render(<PositionSelector navigation={navigation} />)
    const button = screen.getByText('지도에서 찾기')
    fireEvent.press(button)
    expect(navigation.navigate).toHaveBeenCalledWith('MapSearch')
  })
})
