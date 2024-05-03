import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'

import { RandomItemModal } from '@_components/RandomRestaurantRecommendation/pages/RestaurantView/randomItemModal'
import { DefaultFlatList } from '@_components/layout/component/defaultFlatList'
import { ListManageIcon } from '@_components/userCustomList/pages/listManageIcon'
import { useListNames } from '@_components/userCustomList/hook/useListNames'
import { RootStackParamList } from '@_types/navigation'
import { Restaurant } from '@_types/restaurant'

export const UserCustomList = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  // AsyncStorage에 저장된 리스트 이름들을 가져오는 커스텀 훅
  const { listNames, fetchListNames } = useListNames()

  const [selectedListName, setSelectedListName] = useState<string>('')

  const [modalVisible, setModalVisible] = useState(false)
  const [restaurantItems, setRestaurantItems] = useState<Restaurant[]>([])

  const handleRestaurantChange = (index: number) => {
    const selectedRestaurant = restaurantItems[index]
    if (selectedRestaurant) {
      navigation.navigate('UserSelectedRestaurantInfo', {
        restaurant: selectedRestaurant,
        listname: selectedListName,
      })
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchListNames()

      return () => {
        // 화면이 포커스를 잃을 때 실행할 코드를 작성합니다.
      }
    }, [fetchListNames]),
  )

  const handlePressItem = async (item: string) => {
    try {
      const savedListData = await AsyncStorage.getItem(item)
      setSelectedListName(item)
      // 리스트에 저장된 데이터가 있을 경우 random picker modal 호출
      if (savedListData !== null && JSON.parse(savedListData).length > 0) {
        setRestaurantItems(JSON.parse(savedListData))
        setModalVisible(true)
      } else {
        setRestaurantItems([])
        Alert.alert(`${item}에 저장된 데이터가 없습니다.`)
      }
    } catch (error) {
      console.error('Error loading list data:', error)
    }
  }

  return (
    <View style={styles.container}>
      <DefaultFlatList
        data={listNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => <Text style={styles.listText}>{item}</Text>}
        onPressItem={handlePressItem}
      />
      <ListManageIcon navigation={navigation} />
      <RandomItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        restaurantItems={restaurantItems}
        onRestaurantIndexChange={handleRestaurantChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  listText: {
    fontSize: 20,
    textAlign: 'center',
  },
})
