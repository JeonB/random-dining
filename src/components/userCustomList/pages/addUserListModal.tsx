import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

import { useListNames } from '@_components/userCustomList/hook/useListNames'
import { Restaurant } from '@_types/restaurant'

export const AddUserListModal = (selectedInfo: Restaurant) => {
  const { listNames, saveListNames } = useListNames()

  Alert.alert(
    '리스트에 추가',
    '어느 리스트에 추가하시겠습니까?',
    [
      ...listNames.map((listName: string) => ({
        text: listName,
        onPress: async () => {
          const savedList = await AsyncStorage.getItem(listName)

          // 저장된 리스트가 있으면 파싱하고, 없으면 빈 배열을 사용
          const list = savedList ? JSON.parse(savedList) : []

          // 선택된 항목이 리스트에 없으면 추가하고, AsyncStorage에 저장
          if (
            !list.some(
              (item: { id: number }) =>
                item && item.id && item.id === selectedInfo.id,
            )
          ) {
            list.push(selectedInfo)
            await AsyncStorage.setItem(listName, JSON.stringify(list))
            Alert.alert(
              `"${selectedInfo.place_name}" 추가`,
              `"${listName}"에 추가되었습니다.`,
            )
          } else {
            // 항목이 이미 있다면 메시지 표시
            Alert.alert(
              `"${selectedInfo.place_name}" 추가`,
              `"${listName}"에 "${selectedInfo.place_name}"이/가 이미 있습니다.`,
            )
          }
        },
      })),
      {
        text: '+ 새로운 리스트 만들기',
        onPress: () => {
          Alert.prompt('리스트 생성', '리스트 이름을 입력해주세요.', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async text => {
                if (text) {
                  // 새로운 리스트를 생성, AsyncStorage에 저장
                  listNames.push(text)
                  await saveListNames(listNames)
                  await AsyncStorage.setItem(
                    text,
                    JSON.stringify([selectedInfo]),
                  )
                  Alert.alert('리스트 생성 완료', `"${text}"에 추가됐습니다.`)
                } else {
                  Alert.alert(
                    '리스트 이름은 비워둘 수 없습니다.',
                    '리스트 이름을 입력해주세요.',
                  )
                }
              },
            },
          ])
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    { cancelable: true },
  )
  return null
}
