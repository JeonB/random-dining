import React from 'react'
import { render } from '@testing-library/react-native'
import { AnimatedRandomSelector } from '../components/animatedRandomSelector'
import { Restaurant } from 'src/types/restaurant'

describe('AnimatedRandomSelector', () => {
  test('정상적으로 렌더링되는지 확인', () => {
    const items = [
      { place_name: '봉이밥' },
      { place_name: '긴자료코' },
      { place_name: '마부자 김치찌개' },
    ]

    const { getAllByText } = render(
      <AnimatedRandomSelector
        restaurantItems={items as Restaurant[]}
        onIndexChange={() => {}}
        itemHeight={50}
      />,
    )

    items.forEach(item => {
      expect(getAllByText(item.place_name)).toBeTruthy()
    })
  })
})
