import React from 'react'
import { render, fireEvent, RenderAPI } from '@testing-library/react-native'
import { NavigationProp } from '@react-navigation/native'

import { ListManageIcon } from '@_userListPages/listManageIcon'
import { RootStackParamList } from '@_types/listParamList'

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
} as unknown as NavigationProp<RootStackParamList>

jest.useFakeTimers()

describe('<ListManageIcon />', () => {
  let utils: RenderAPI

  beforeEach(() => {
    utils = render(<ListManageIcon navigation={navigation} />)
  })

  test('아이콘 렌더링', () => {
    expect(utils.getByTestId('listManageIcon')).toBeTruthy()
  })

  test('아이콘 클릭시 수정,추가 modal 호출', async () => {
    fireEvent.press(utils.getByTestId('listManageIcon'))

    expect(utils.getByText('리스트 수정하기')).toBeTruthy()
    expect(utils.getByText('리스트 추가하기')).toBeTruthy()
  })

  test('수정하기 버튼 클릭시 네비게이션 호출', async () => {
    fireEvent.press(utils.getByTestId('listManageIcon'))
    fireEvent.press(utils.getByText('리스트 수정하기'))

    expect(navigation.navigate).toHaveBeenCalledWith('SelectEditList')
  })

  test('추가하기 버튼 클릭시 네비게이션 호출', async () => {
    fireEvent.press(utils.getByTestId('listManageIcon'))
    fireEvent.press(utils.getByText('리스트 추가하기'))

    expect(navigation.navigate).toHaveBeenCalledWith('AddUserList')
  })
})
