import React from 'react'

import { render, fireEvent, RenderAPI } from '@testing-library/react-native'
import { NavigationContainer, NavigationProp } from '@react-navigation/native'

import { SelectEditList } from '@_components/userCustomList/pages/selectEditList'
import { RootStackParamList } from '@_types/navigation'

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
} as unknown as NavigationProp<RootStackParamList>

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(key => {
    if (key === 'listnames') {
      return Promise.resolve(JSON.stringify(['List 1', 'List 2'])) // listnames에 저장된 리스트 이름
    } else if (key === 'List 1') {
      return Promise.resolve(JSON.stringify(['Item 1', 'Item 2'])) // List 1에 저장된 아이템
    } else if (key === 'List 2') {
      return Promise.resolve(null) // List 2에 저장된 아이템 없음
    }
  }),
}))

jest.mock('@_components/userCustomList/hook/useListNames', () => ({
  useListNames: () => ({
    listNames: ['List 1', 'List 2'],
    fetchListNames: jest.fn(),
  }),
}))

describe('<SelectEditList />', () => {
  let utils: RenderAPI

  beforeEach(() => {
    utils = render(
      <NavigationContainer>
        <SelectEditList navigation={navigation} />
      </NavigationContainer>,
    )
  })

  test('AsyncStorage 리스트 렌더링', async () => {
    expect(utils.getByText('List 1')).toBeDefined()
    expect(utils.getByText('List 2')).toBeDefined()
  })

  test('리스트 선택 안내 메세지', async () => {
    expect(utils.getByText('수정 할 리스트를 선택해주세요')).toBeDefined()
  })

  test('리스트 클릭시 네비게이션 호출', async () => {
    fireEvent.press(utils.getByText('List 1'))
    expect(navigation.navigate).toHaveBeenCalledWith('EditUserList', {
      listName: 'List 1',
    })
  })
})
