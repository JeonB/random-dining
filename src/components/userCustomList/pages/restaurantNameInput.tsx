import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert, Dimensions, StyleSheet, TextInput, View } from 'react-native'
import { Icon } from '@rneui/themed'

import { RestaurantTypes } from '@_types/restaurant'

interface Props {
  listItems: RestaurantTypes[]
  setListItems: Dispatch<SetStateAction<RestaurantTypes[]>>
}

export const RestaurantNameInput: React.FC<Props> = ({
  listItems,
  setListItems,
}) => {
  const [inputRestaurant, setInputRestaurant] = useState('')

  const handlePressRestaurantAddButton = () => {
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

  return (
    <View style={styles.restaurantInputContainer}>
      <TextInput
        style={styles.restaurantNameField}
        placeholder="식당 또는 메뉴 이름을 입력하세요."
        onChangeText={setInputRestaurant}
        value={inputRestaurant}
        testID="restaurantNameField"
        onSubmitEditing={handlePressRestaurantAddButton}
        returnKeyType="done"
      />
      <Icon
        name="add"
        size={22}
        onPress={handlePressRestaurantAddButton}
        testID="restaurantAddButton"
        style={styles.addIcon}
      />
    </View>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  restaurantInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantNameField: {
    width: '85%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  addIcon: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 7,
  },
})
