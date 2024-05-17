import React from 'react'
import { render } from '@testing-library/react-native'
import { AnimatedRandomSelector } from '../pages/RestaurantView/animatedRandomSelector'
import { LocationTypes } from 'src/types/restaurant'

describe('AnimatedRandomSelector', () => {
  test('정상적으로 렌더링되는지 확인', () => {
    const items = [
      { place_name: '봉이밥' },
      { place_name: '긴자료코' },
      { place_name: '마부자 김치찌개' },
    ]

    const { getAllByText } = render(
      <AnimatedRandomSelector
        restaurantItems={items as LocationTypes[]}
        onIndexChange={() => {}}
        itemHeight={50}
        closeModal={() => {}}
      />,
    )

    items.forEach(item => {
      expect(getAllByText(item.place_name)).toBeTruthy()
    })
  })
})
