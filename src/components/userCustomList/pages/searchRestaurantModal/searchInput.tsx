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
      placeholder="식당, 메뉴 검색"
      onChangeText={setInputRestaurant}
      value={inputRestaurant}
      autoFocus={true}
      onSubmitEditing={() => {
        if (inputRestaurant.trim() !== '') {
          handlePressSearchButton()
        }
      }}
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
    fontSize: 16,
    marginLeft: 10,
    marginHorizontal: 5,
    width: '90%',
  },
})

export default SearchInput
