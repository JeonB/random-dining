import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'
import RandomItemModal from '@_3Rpages/RestaurantView/randomItemModal'
import { LocationTypes } from '@_types/restaurant'
import { RootStackParamList } from '@_types/listParamList'
import { useListNames } from '@_userList/hook/useListNames'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import { ListManageIcon } from '@_userListPages/listManage/listManageIcon'

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
        restaurantList: restaurantItems,
      })
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchListNames()
    }, []),
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

  const handleAddButtonClick = () => {
    navigation.navigate('AddUserList')
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {listNames.length === 0 ? (
          <View style={styles.infoArea}>
            <Button
              mode="contained"
              style={styles.infoButton}
              buttonColor={MyTheme.colors.primary}
              textColor="white"
              labelStyle={styles.infoText}
              onPress={handleAddButtonClick}>
              나만의 리스트를 만들어보세요!
            </Button>
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
    padding: width * 0.07,
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
  infoButton: {
    borderRadius: 10,
    padding: 5,
    width: '100%',
  },
  infoText: {
    fontSize: width > 360 ? 20 : 15,
  },
})
