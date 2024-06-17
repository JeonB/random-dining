import React, { useRef, useState } from 'react'
import { SearchBar } from '@rneui/themed'
import { View, StyleSheet } from 'react-native'
import { fetchLocationData } from '@_services/api'
import { LocationTypes } from '@_types'

const PlaceSearchBar = ({
  setAddressData,
}: {
  setAddressData: (data: LocationTypes[]) => void
}) => {
  const [search, setSearch] = useState<string>('')
  const [prevSearch, setPrevSearch] = useState<string>('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const fetchData = async (query: string) => {
    if (query !== '') {
      const data = await fetchLocationData(query)
      if (data) {
        setAddressData(data)
      }
    } else {
      setAddressData([])
    }
  }
  const onChangeText = (query: string) => {
    setSearch(query)
    if (query.length < prevSearch.length) {
      setAddressData([])
    }
    setPrevSearch(query)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => fetchData(query), 1500)
  }

  const onEndEditing = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    fetchData(search)
  }
  return (
    <View style={styles.container}>
      <SearchBar
        onClear={() => setAddressData([])}
        onEndEditing={onEndEditing}
        placeholder="장소, 주소 검색"
        onChangeText={onChangeText}
        value={search}
        containerStyle={styles.innerContainer}
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 10,
  },
  innerContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderBlockColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,
    elevation: 5,
  },
  inputContainer: {
    backgroundColor: 'white',
    height: '80%',
  },
  input: {
    color: 'black',
  },
})

export default PlaceSearchBar
