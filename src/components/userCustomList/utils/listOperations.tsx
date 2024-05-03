import { Alert } from 'react-native'

import { RestaurantTypes } from '@_types/restaurant'

// 식당 추가 버튼을 눌렀을 경우
export const handlePressRestaurantAddButton = (
  inputRestaurant: string,
  listItems: RestaurantTypes[],
  setListItems: React.Dispatch<React.SetStateAction<RestaurantTypes[]>>,
  setInputRestaurant: React.Dispatch<React.SetStateAction<string>>,
) => {
  // 입력 필드가 비어있을 경우 경고창을 띄움
  if (inputRestaurant.trim() === '') {
    Alert.alert('식당 또는 메뉴 이름을 입력하세요.')
    return
  }

  // 이미 리스트에 있는 식당 이름을 입력한 경우 경고창을 띄움
  if (listItems.some(item => item.place_name === inputRestaurant.trim())) {
    Alert.alert('이미 리스트에 있는 식당 이름입니다.')
    return
  }

  // 입력 필드에 입력된 값을 리스트에 추가
  setListItems(prevItems => [
    ...prevItems,
    {
      place_name: inputRestaurant,
    },
  ])
  setInputRestaurant('') // 입력 필드를 초기화
}

export const filterItems = (items: RestaurantTypes[], itemToRemove: string) => {
  return items.filter(item => item.place_name !== itemToRemove)
}

export const handlePressDeleteButton = (
  setListItems: React.Dispatch<React.SetStateAction<RestaurantTypes[]>>,
  item: string,
) => {
  setListItems(prevItems => filterItems(prevItems, item))
}
