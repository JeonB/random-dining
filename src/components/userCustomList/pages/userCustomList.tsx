import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'

import RandomItemModal from '@_components/RandomRestaurantRecommendation/pages/RestaurantView/randomItemModal'
import { DefaultFlatList } from '@_components/layout/component/defaultFlatList'
import { ListManageIcon } from '@_components/userCustomList/pages/listManageIcon'
import { useListNames } from '@_components/userCustomList/hook/useListNames'
import { RootStackParamList } from '@_types/navigation'
import { RestaurantTypes } from '@_types/restaurant'

export const UserCustomList = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  const { listNames, fetchListNames } = useListNames() // AsyncStorage에 저장된 리스트 이름들을 가져오는 커스텀 훅
  const [selectedListName, setSelectedListName] = useState<string>('') // 선택된 리스트 이름
  const [modalVisible, setModalVisible] = useState(false)
  const [restaurantItems, setRestaurantItems] = useState<RestaurantTypes[]>([])

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
    }, [fetchListNames]),
  )
  const handlePressItem = async (item: string) => {
    try {
      const savedListData = await AsyncStorage.getItem(item) // 선택된 리스트 이름에 저장된 데이터를 가져옴
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
      <View style={styles.listContainer}>
        <DefaultFlatList
          data={listNames}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => <Text style={styles.listText}>{item}</Text>}
          onPressItem={handlePressItem}
        />
        <View style={styles.iconWrapper}>
          <ListManageIcon navigation={navigation} />
        </View>
      </View>
      <RandomItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        restaurantItems={restaurantItems}
        onRestaurantIndexChange={handleRestaurantChange}
      />
    </View>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.1,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  iconWrapper: {
    alignItems: 'flex-end',
  },
  listText: {
    fontSize: 20,
    textAlign: 'center',
  },
})
