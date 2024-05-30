import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Icon } from '@rneui/themed'
import { LocationTypes } from '@_types/restaurant'
import { MyTheme } from 'theme'
import { Feather } from '@expo/vector-icons'
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
      <View style={styles.inputArea}>
        <TextInput
          style={styles.restaurantNameField}
          placeholder="식당 또는 메뉴 이름을 입력하세요."
          onChangeText={setInputRestaurant}
          value={inputRestaurant}
          testID="restaurantNameField"
          returnKeyType="done"
          clearButtonMode="always"
          onSubmitEditing={() => {
            if (inputRestaurant.trim() !== '') {
              handlePressRestaurantAddButton()
            }
          }}
        />
        {Platform.OS === 'android' && inputRestaurant ? (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
            }}
            onPress={() => setInputRestaurant('')}>
            <Feather name="x" size={15} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.iconContainer}>
        <Icon
          name="add"
          size={22}
          color={addIconColor}
          onPress={handlePressRestaurantAddButton}
          testID="restaurantAddButton"
          disabled={inputRestaurant.trim() === ''}
          disabledStyle={{ backgroundColor: 'white' }}
        />
      </View>
    </View>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  restaurantInputContainer: {
    flexDirection: 'row',
  },
  restaurantNameField: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: width > 360 ? 17 : 15,
    marginRight: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  inputArea: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
})
