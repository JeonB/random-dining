import React from 'react'
import { Text } from 'react-native'

import { render, fireEvent } from '@testing-library/react-native'
import { DefaultFlatList } from '@_components/layout/component/defaultFlatList'

describe('DefaultFlatList', () => {
  test('리스트 렌더링', () => {
    const { getByText } = render(
      <DefaultFlatList
        data={['Item 1', 'Item 2']}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => <Text>{item}</Text>}
      />,
    )
    expect(getByText('Item 1')).toBeTruthy()
    expect(getByText('Item 2')).toBeTruthy()
  })

  test('아이템 클릭시 handlePressItem 호출', () => {
    const handlePressItem = jest.fn()
    const { getByText } = render(
      <DefaultFlatList
        data={['Item 1', 'Item 2']}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => <Text>{item}</Text>}
        onPressItem={handlePressItem}
      />,
    )
    fireEvent.press(getByText('Item 1'))
    expect(handlePressItem).toHaveBeenCalled()
  })
})
