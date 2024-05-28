import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'

import RandomItemModal from '@_components/RandomRestaurantRecommendation/pages/RestaurantView/randomItemModal'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import { ListManageIcon } from '@_userListPages/listManage/listManageIcon'
import { useListNames } from '@_userList/hook/useListNames'
import { RootStackParamList } from '@_types/listParamList'
import { LocationTypes } from '@_types/restaurant'
import { MyTheme } from 'theme'

export const UserCustomList = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  const { listNames, fetchListNames } = useListNames() // AsyncStorage에 저장된 리스트 이름들을 가져오는 커스텀 훅
  const [selectedListName, setSelectedListName] = useState<string>('') // 선택된 리스트 이름
  const [modalVisible, setModalVisible] = useState(false)
  const [restaurantItems, setRestaurantItems] = useState<LocationTypes[]>([])

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
        {listNames.length === 0 ? (
          <View style={styles.infoArea}>
            <View style={styles.textArea}>
              <Text style={styles.infoText}>나만의 리스트를 만들어보세요</Text>
            </View>
          </View>
        ) : (
          <DefaultFlatList
            data={listNames}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => (
              <Text
                style={styles.listText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item}
              </Text>
            )}
            onPressItem={handlePressItem}
          />
        )}
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
    marginTop: 20,
    alignItems: 'flex-end',
  },
  listText: {
    fontSize: 20,
    textAlign: 'center',
  },
  infoArea: {
    flex: 1,
    alignItems: 'center',
  },
  textArea: {
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 25,
    backgroundColor: MyTheme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 20,
  },
})
