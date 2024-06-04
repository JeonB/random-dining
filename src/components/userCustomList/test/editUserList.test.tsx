import React from 'react'
import { Alert } from 'react-native'
import {
  render,
  fireEvent,
  waitFor,
  act,
  RenderAPI,
} from '@testing-library/react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { EditUserList } from '@_userListPages/editUserList'
import { RootStackParamList } from '@_types/listParamList'

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
} as unknown as NavigationProp<RootStackParamList>

const route: RouteProp<RootStackParamList, 'EditUserList'> = {
  key: 'EditUserList',
  name: 'EditUserList',
  params: {
    listName: 'List 1',
  },
}

jest.mock('@react-native-async-storage/async-storage', () => {
  const mockAsyncStorage = {
    getItem: jest.fn(key => {
      if (key === 'listnames') {
        return Promise.resolve(JSON.stringify(['List 1']))
      } else if (key === 'List 1') {
        return Promise.resolve(
          JSON.stringify([{ place_name: 'Item 1' }, { place_name: 'Item 2' }]),
        )
      }
    }),
    setItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve(null)),
  }

  return mockAsyncStorage
})

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      KAKAO_JAVASCRIPT_KEY: '1234',
    },
  },
}))

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() => ({ status: 'granted' })),
  getCurrentPositionAsync: jest.fn(() => ({
    coords: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  })),
  Accuracy: {
    Lowest: 'Lowest',
  },
}))

jest.mock('@expo/vector-icons', () => {
  return {
    Feather: 'Feather',
  }
})

const mockSaveListNames = jest.fn()
jest.mock('@_userList/hook/useListNames', () => ({
  useListNames: () => ({
    listNames: ['List 1', 'List 2'],
    saveListNames: mockSaveListNames,
  }),
}))

jest.mock('@_userListPages/searchRestaurantModal/changeSortButton', () =>
  jest.fn(),
)

jest.mock('@_components/useHideTabBar', () => ({
  useHideTabBar: () => {
    return jest.fn()
  },
}))

describe('<EditUserList />', () => {
  let alertSpy: jest.SpyInstance
  let utils: RenderAPI

  beforeEach(async () => {
    alertSpy = jest.spyOn(Alert, 'alert')
    jest.clearAllMocks()
    await waitFor(
      () =>
        (utils = render(
          <EditUserList navigation={navigation} route={route} />,
        )),
    )
  })

  afterEach(() => {
    alertSpy.mockRestore()
  })

  test('식당 리스트, 리스트 이름 수정 필드, 식당 추가 필드, 리스트 삭제 버튼, 리스트 저장 버튼 렌더링', async () => {
    expect(utils.findByText('Item 1')).toBeDefined()
    expect(utils.getByTestId('ListNameField')).toBeDefined() // 리스트 이름 수정 입력 필드
    expect(utils.getByTestId('restaurantNameField')).toBeDefined() // 식당 이름 입력 필드
    expect(utils.getByTestId('restaurantAddButton')).toBeDefined() // 식당 추가 버튼
    expect(utils.getByTestId('deleteListButton')).toBeDefined() // 리스트 삭제 버튼
    expect(utils.getByTestId('saveListButton')).toBeDefined() // 리스트 저장 버튼
  })

  test('식당/메뉴 이름 입력 후 추가 버튼 클릭시 추가', async () => {
    const input = utils.getByPlaceholderText(
      '식당 또는 메뉴 이름을 입력하세요.',
    )
    fireEvent.changeText(input, '새로운 식당')
    fireEvent.press(utils.getByTestId('restaurantAddButton'))

    expect(utils.getByText('새로운 식당')).toBeTruthy()
  })

  test('식당 검색 버튼 클릭시 모달 open', async () => {
    expect(utils.getByTestId('SearchButton')).toBeTruthy()
    fireEvent.press(utils.getByTestId('SearchButton'))
    expect(utils.getByTestId('SearchModal')).toBeTruthy()
  })

  test('리스트 삭제 버튼 클릭시 리스트 삭제', async () => {
    fireEvent.press(utils.getByTestId('deleteListButton'))
    act(() => {
      alertSpy.mock.calls[0][2][1].onPress()
    })
    await waitFor(() => {
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('List 1')
    })
  })

  test('저장 버튼 클릭시 리스트 저장', async () => {
    // 리스트 이름 수정
    const inputListName = utils.getByTestId('ListNameField')
    fireEvent.changeText(inputListName, '새로운 리스트 이름')

    // 식당 추가
    const inputRestaurant = utils.getByPlaceholderText(
      '식당 또는 메뉴 이름을 입력하세요.',
    )
    fireEvent.changeText(inputRestaurant, '새로운 식당')
    fireEvent.press(utils.getByTestId('restaurantAddButton'))

    await act(async () => {
      fireEvent.press(utils.getByTestId('saveListButton'))
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
        JSON.stringify([
          { place_name: 'Item 1' },
          { place_name: 'Item 2' },
          { place_name: '새로운 식당' },
        ]),
      )

      // saveListNames(listNames) 호출 확인
      expect(mockSaveListNames).toHaveBeenCalledWith([
        '새로운 리스트 이름',
        'List 2',
      ])

      // 변경전 리스트 이름 삭제 호출 확인
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('List 1')
    })

    // navigation.reset 호출 확인
    expect(navigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [
        { name: 'UserCustomList', params: { screen: 'UserCustomList' } },
      ],
    })
  })

  test('식당 삭제 클릭시 식당 삭제', async () => {
    const item1 = await utils.findByText('Item 1')
    expect(item1).toBeDefined()
    fireEvent.press(utils.getByTestId(`restaurantDeleteButton-Item 1`))
    const item1AfterDelete = utils.queryByText('Item 1')
    expect(item1AfterDelete).toBeNull()
  })
})
