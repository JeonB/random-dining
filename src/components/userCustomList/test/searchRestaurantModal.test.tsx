import React from 'react'
import { Alert } from 'react-native'
import {
  render,
  fireEvent,
  waitFor,
  RenderAPI,
} from '@testing-library/react-native'

import SearchRestaurantModal from '@_components/userCustomList/pages/searchRestaurantModal/searchRestaurantModal'
import { handleData } from '@_services/searchRestaurantApi'

jest.mock('@_services/searchRestaurantApi', () => ({
  handleData: jest.fn().mockResolvedValue([{ place_name: '새로운 식당' }]),
}))

const listItems = [{ place_name: 'Item 1' }, { place_name: 'Item 2' }]
const setListItems = jest.fn()
const onClose = jest.fn()

jest.mock('@expo/vector-icons', () => {
  return {
    MaterialIcons: 'MaterialIcons',
  }
})

describe('<SearchRestaurantModal />', () => {
  let alertSpy: jest.SpyInstance
  let utils: RenderAPI

  beforeEach(() => {
    alertSpy = jest.spyOn(Alert, 'alert')
    jest.clearAllMocks()
    utils = render(
      <SearchRestaurantModal
        visible={true}
        onClose={onClose}
        listItems={listItems}
        setListItems={setListItems}
      />,
    )
  })

  afterEach(() => {
    alertSpy.mockRestore()
  })

  test('식당/메뉴 입력 필드, 검색 버튼 렌더링', async () => {
    expect(utils.getByTestId('restaurantNameField')).toBeTruthy()
    expect(utils.getByTestId('searchButton')).toBeTruthy()
  })

  test('식당/메뉴 이름 입력 후 검색 버튼 클릭시 식당 리스트 렌더링', async () => {
    const input = utils.getByPlaceholderText(
      '식당 또는 메뉴 이름을 입력하세요.',
    )
    // 검색할 식당 이름 입력
    fireEvent.changeText(input, '새로운 식당')
    // 검색 버튼 클릭
    fireEvent.press(utils.getByTestId('searchButton'))
    // handleData 함수가 호출되었는지 확인
    await waitFor(() =>
      expect(handleData).toHaveBeenCalledWith('새로운 식당', 'accuracy'),
    )
    // 식당 리스트가 렌더링되었는지 확인
    expect(utils.getByText('새로운 식당')).toBeDefined()
  })

  test('추가 버튼 클릭시 listItems에 리스트 추가', async () => {
    const input = utils.getByPlaceholderText(
      '식당 또는 메뉴 이름을 입력하세요.',
    )
    fireEvent.changeText(input, '새로운 식당')
    fireEvent.press(utils.getByTestId('searchButton'))
    await waitFor(() =>
      expect(handleData).toHaveBeenCalledWith('새로운 식당', 'accuracy'),
    )
    // 검색된 식당 리스트 렌더링 후 추가 버튼 클릭
    fireEvent.press(utils.getByText('추가'))
    // listItems에 새로운 식당이 추가되었는지 확인
    expect(setListItems).toHaveBeenCalledWith([
      { place_name: 'Item 1' },
      { place_name: 'Item 2' },
      { place_name: '새로운 식당' },
    ])
  })

  test('식당 이름을 작성하지 않고 검색 버튼 클릭시 예외 문구', async () => {
    const message = '식당 또는 메뉴 이름을 입력하세요.'
    const input = utils.getByPlaceholderText(
      '식당 또는 메뉴 이름을 입력하세요.',
    )
    fireEvent.changeText(input, '')
    fireEvent.press(utils.getByTestId('searchButton'))
    expect(alertSpy).toHaveBeenCalledWith(message)
  })

  test('닫기 버튼 클릭시 모달 닫힘', async () => {
    fireEvent.press(utils.getByText('닫기'))
    expect(onClose).toHaveBeenCalledWith()
  })
})
