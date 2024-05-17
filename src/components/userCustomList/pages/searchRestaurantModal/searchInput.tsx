import React from 'react'
import {
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

interface SearchInputProps {
  inputRestaurant: string
  setInputRestaurant: (value: string) => void
  handlePressSearchButton: () => void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  inputRestaurant,
  setInputRestaurant,
  handlePressSearchButton,
}) => (
  <View style={styles.searchFeild}>
    <Feather name="search" size={15} color="black" />
    <TextInput
      style={styles.restaurantNameField}
      placeholder="식당 또는 메뉴 이름을 입력하세요."
      onChangeText={setInputRestaurant}
      value={inputRestaurant}
      autoFocus={true}
      onSubmitEditing={handlePressSearchButton}
      returnKeyType="search"
      clearButtonMode="always"
      testID="restaurantNameField"
      enablesReturnKeyAutomatically={true}
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
)

const styles = StyleSheet.create({
  searchFeild: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
  },
  restaurantNameField: {
    marginLeft: 10,
    marginHorizontal: 5,
    width: '90%',
  },
})

export default SearchInput
