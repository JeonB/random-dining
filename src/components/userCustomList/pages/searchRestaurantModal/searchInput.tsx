import React from 'react'
import { StyleSheet } from 'react-native'
import { SearchBar } from '@rneui/themed'

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
  <SearchBar
    onClear={() => setInputRestaurant('')}
    placeholder="식당, 메뉴 검색"
    onChangeText={setInputRestaurant}
    value={inputRestaurant}
    containerStyle={styles.innerContainer}
    inputStyle={styles.input}
    inputContainerStyle={styles.inputContainer}
    autoFocus={true}
    returnKeyType="search"
    onSubmitEditing={() => {
      if (inputRestaurant.trim() !== '') {
        handlePressSearchButton()
      }
    }}
  />
)

const styles = StyleSheet.create({
  innerContainer: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#d9dbda',
    borderBlockColor: 'white',
  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: '#d9dbda',
  },
  input: {
    color: 'black',
  },
})

export default SearchInput
