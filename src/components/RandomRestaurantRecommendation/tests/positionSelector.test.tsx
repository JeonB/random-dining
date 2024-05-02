import React from 'react'
import { PositionSelector } from '../pages/positionSelector'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { RestaurantProvider } from '../pages/context/restaurantProvider'
describe('postionSelector', () => {
  test('렌더링 테스트', () => {
    render(
      <NavigationContainer>
        <PositionSelector />
      </NavigationContainer>,
    )
    const mediaContainer = screen.getByTestId('mediaContainer')
    const button = screen.getByText('내 위치에서 찾기')
    expect(mediaContainer).toBeTruthy()
    expect(button).toBeTruthy()
  })

  test('내 위치에서 찾기 버튼 클릭 시 navigate 호출', () => {
    render(
      <NavigationContainer>
        <PositionSelector />
      </NavigationContainer>,
    )
    const button = screen.getByText('내 위치에서 찾기')
    expect(button).toBeTruthy()
    fireEvent.press(button)
    expect(screen.getByTestId('test')).toBeOnTheScreen()
  })
  // test('지도에서 찾기 버튼 클릭 시 navigate 호출', () => {
  //   render(
  //     <NavigationContainer>
  //       <PositionSelector />
  //     </NavigationContainer>,
  //   )
  //   const button = screen.getByText('지도에서 찾기')
  //   fireEvent.press(button)
  //   expect(navigation.navigate).toHaveBeenCalledWith('MapSearch')
  // })
})
