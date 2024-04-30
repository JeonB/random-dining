import React from 'react'
import { Alert } from 'react-native'

import { render, fireEvent, waitFor, act } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { EditUserList } from '@_components/userCustomList/component/editUserList'

//Navigation 테스트를 위한 mock
const navigateMock = jest.fn()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      reset: navigateMock,
    }),
    useRoute: () => ({
      params: {
        listName: 'List 1',
      },
    }),
  }
})

const alertSpy = jest.spyOn(Alert, 'alert')

//AsyncStorage 테스트를 위한 mock
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(key => {
    if (key === 'listnames') {
      return Promise.resolve(JSON.stringify(['List 1']))
    } else if (key === 'List 1') {
      return Promise.resolve(
        JSON.stringify([{ place_name: 'Item 1' }, { place_name: 'Item 2' }]),
      )
    }
  }),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}))

const mockSaveListNames = jest.fn()
jest.mock('@_components/userCustomList/hook/useListNames', () => ({
  useListNames: () => ({
    listNames: ['List 1', 'List 2'],
    saveListNames: mockSaveListNames,
  }),
}))

describe('<EditUserList />', () => {
  let alertSpy: jest.SpyInstance

  beforeEach(() => {
    alertSpy = jest.spyOn(Alert, 'alert')
    jest.clearAllMocks()
  })

  afterEach(() => {
    alertSpy.mockRestore()
  })
  test('식당 리스트 렌더링', async () => {
    const { findByText } = render(
      <NavigationContainer>
        <EditUserList />
      </NavigationContainer>,
    )
    const item1 = await findByText('Item 1')
    const item2 = await findByText('Item 2')

    expect(item1).toBeDefined()
    expect(item2).toBeDefined()
  })

  test('리스트 이름 수정 필드, 식당 추가 필드, 리스트 삭제 버튼, 리스트 저장 버튼 렌더링', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <EditUserList />
      </NavigationContainer>,
    )
    expect(getByTestId('ListNameField')).toBeDefined() // 리스트 이름 수정 입력 필드
    expect(getByTestId('restaurantNameField')).toBeDefined() // 식당 이름 입력 필드
    expect(getByTestId('restaurantAddButton')).toBeDefined() // 식당 추가 버튼
    expect(getByTestId('deleteListButton')).toBeDefined() // 리스트 삭제 버튼
    expect(getByTestId('saveListButton')).toBeDefined() // 리스트 저장 버튼
  })

  test('식당/메뉴 이름 입력 후 추가 버튼 클릭시 추가', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <NavigationContainer>
        <EditUserList />
      </NavigationContainer>,
    )

    const input = getByPlaceholderText('식당 또는 메뉴 이름을 입력하세요.')
    fireEvent.changeText(input, '새로운 식당')
    fireEvent.press(getByTestId('restaurantAddButton'))

    expect(getByText('새로운 식당')).toBeTruthy()
  })

  test('식당 이름을 작성하지 않고 추가 버튼 클릭시 예외 문구', async () => {
    const message = '식당 또는 메뉴 이름을 입력하세요.'

    const { getByPlaceholderText, getByTestId } = render(
      <NavigationContainer>
        <EditUserList />
      </NavigationContainer>,
    )
    const input = getByPlaceholderText('식당 또는 메뉴 이름을 입력하세요.')
    fireEvent.changeText(input, '')
    fireEvent.press(getByTestId('restaurantAddButton'))

    expect(alertSpy).toHaveBeenCalledWith(message)
  })

  test('리스트 삭제 버튼 클릭시 리스트 삭제', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <EditUserList />
      </NavigationContainer>,
    )
    fireEvent.press(getByTestId('deleteListButton'))
    expect(alertSpy).toHaveBeenCalledWith(
      'List 1 삭제',
      '리스트를 삭제하시겠습니까?',
      [
        { text: '아니오', style: 'cancel' },
        { text: '예', onPress: expect.any(Function) },
      ],
      { cancelable: false },
    )
  })

  test('저장 버튼 클릭시 리스트 저장', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <NavigationContainer>
        <EditUserList />
      </NavigationContainer>,
    )

    // 리스트 이름 수정
    const inputListName = getByPlaceholderText('List Name')
    fireEvent.changeText(inputListName, '새로운 리스트 이름')

    // 식당 추가
    const inputRestaurant = getByPlaceholderText(
      '식당 또는 메뉴 이름을 입력하세요.',
    )
    fireEvent.changeText(inputRestaurant, '새로운 식당')
    fireEvent.press(getByTestId('restaurantAddButton'))

    await act(async () => {
      fireEvent.press(getByTestId('saveListButton'))
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        '저장 확인',
        '변경 사항을 저장하시겠습니까?',
        [
          { text: '아니오', style: 'cancel' },
          { text: '예', onPress: expect.any(Function) },
        ],
        { cancelable: false },
      )
    })
    act(() => {
      alertSpy.mock.calls[0][2][1].onPress() // alert의 두 번째 버튼(예) 클릭
    })

    await waitFor(() => {
      // AsyncStorage.setItem(newListName,  JSON.stringify(listData)) 호출 확인
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '새로운 리스트 이름',
        JSON.stringify([{ place_name: '새로운 식당' }]),
      )

      // saveListNames(listNames) 호출 확인
      expect(mockSaveListNames).toHaveBeenCalledWith([
        '새로운 리스트 이름',
        'List 2',
      ])
    })

    // 변경전 리스트 이름 삭제 호출 확인
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('List 1')

    // navigation.reset 호출 확인
    expect(navigateMock).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'Main', params: { screen: 'UserCustomList' } }],
    })
  })

  test('식당 삭제 클릭시 식당 삭제', async () => {
    const { getByTestId, findByText, queryByText } = render(<EditUserList />)

    const item1 = await findByText('Item 1')

    expect(item1).toBeDefined()
    fireEvent.press(getByTestId('restaurantDeleteButton-Item 1'))

    const item1AfterDelete = queryByText('Item 1')
    expect(item1AfterDelete).toBeNull()
  })
})
