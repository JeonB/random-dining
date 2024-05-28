import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert, Dimensions, StyleSheet, TextInput, View } from 'react-native'
import { Icon } from '@rneui/themed'
import { LocationTypes } from '@_types/restaurant'
import { MyTheme } from 'theme'

interface Props {
  listItems: LocationTypes[]
  setListItems: Dispatch<SetStateAction<LocationTypes[]>>
}

export const RestaurantNameInput: React.FC<Props> = ({
  listItems,
  setListItems,
}) => {
  const [inputRestaurant, setInputRestaurant] = useState('')

  const handlePressRestaurantAddButton = () => {
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
  const addIconColor = inputRestaurant ? MyTheme.colors.primary : 'gray'
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
        clearButtonMode="always"
      />
      <Icon
        name="add"
        size={22}
        color={addIconColor}
        onPress={handlePressRestaurantAddButton}
        testID="restaurantAddButton"
        style={styles.addIcon}
        disabled={inputRestaurant.trim() === ''}
        disabledStyle={{ backgroundColor: 'white' }}
      />
    </View>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  restaurantInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantNameField: {
    width: '85%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 17,
  },
  addIcon: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
})
