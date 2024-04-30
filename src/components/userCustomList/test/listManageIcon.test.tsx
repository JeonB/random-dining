import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'

import { ListManageIcon } from '@_components/userCustomList/component/listManageIcon'

const navigateMock = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: navigateMock,
    }),
  }
})

describe('<ListManageIcon />', () => {
  test('아이콘 렌더링', async () => {
    const screen = render(<ListManageIcon />)
    const icon = screen.getByTestId('listManageIcon')
    expect(icon).toBeTruthy()
  })

  test('아이콘 클릭시 수정,추가 modal 호출', async () => {
    const { getByTestId, getByText } = render(<ListManageIcon />)

    fireEvent.press(getByTestId('listManageIcon'))

    await waitFor(() => {
      expect(getByText('리스트 수정하기')).toBeTruthy()
      expect(getByText('리스트 추가하기')).toBeTruthy()
    })
  })

  test('수정하기 버튼 클릭시 네비게이션 호출', async () => {
    const { getByText, getByTestId } = render(<ListManageIcon />)

    fireEvent.press(getByTestId('listManageIcon'))

    await waitFor(() => {
      expect(getByText('리스트 수정하기')).toBeDefined()
    })

    fireEvent.press(getByText('리스트 수정하기'))

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('SelectEditList')
    })
  })
})
