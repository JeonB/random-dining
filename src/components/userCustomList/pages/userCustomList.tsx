import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Alert, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'
import { LocationTypes, RootStackParamList } from '@_types'
import InlineAd from '@_common/ui/inlinedAd'
import RandomItemModal from '@_common/ui/randomItemModal'
import { useListNames } from '@_userList/hook/useListNames'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import { KebapMenuModal } from '@_userListPages/kebapMenuModal'
import { ListItem } from '@_userListPages/listItem'

export const UserCustomList = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  const { listNames, fetchListNames, saveListNames } = useListNames()
  const [selectedListName, setSelectedListName] = useState<string>('')
  const [modalVisible, setModalVisible] = useState(false)
  const [restaurantItems, setRestaurantItems] = useState<LocationTypes[]>([])
  const [menuModalVisible, setMenuModalVisible] = useState(false)
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
  const [selectedItem, setSelectedItem] = useState<string>('')

  useFocusEffect(
    React.useCallback(() => {
      fetchListNames()
    }, []),
  )

  const handleKebapButtonClick = (
    width: number,
    height: number,
    x: number,
    y: number,
  ) => {
    setModalPosition({
      x: x - 1.5 * width,
      y: Platform.OS === 'android' ? y - 15 : y + 5,
    })
    setMenuModalVisible(true)
  }

  const handleEditButtonClick = (listName: string) => {
    navigation.navigate('EditUserList', { listName: listName })
    setMenuModalVisible(false)
  }

  const handleDeleteButtonClick = (listName: string) => {
    Alert.alert(
      `${listName} 삭제`,
      '리스트를 삭제하시겠습니까?',
      [
        {
          text: '아니오',
          style: 'cancel',
        },
        {
          text: '예',
          onPress: async () => {
            try {
              if (listNames !== null) {
                const newListNames = listNames.filter(
                  (name: string) => name !== listName,
                )
                await saveListNames(newListNames)
              }
              await AsyncStorage.removeItem(listName)
              Alert.alert('삭제되었습니다.')
            } catch (error) {
              console.error('Error deleting list:', error)
            }
          },
        },
      ],
      { cancelable: false },
    )
    setMenuModalVisible(false)
  }

  const handleRestaurantChange = useCallback(() => {
    navigation.navigate('UserSelectedRestaurantInfo', {
      listname: selectedListName,
      restaurantList: restaurantItems,
    })
  }, [restaurantItems])

  const handleItemClick = async (item: string) => {
    try {
      const savedListData = await AsyncStorage.getItem(item)
      setSelectedListName(item)
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
              mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
              style={styles.infoButton}
              buttonColor={MyTheme.colors.primary}
              textColor="white"
              labelStyle={styles.infoText}
              onPress={handleAddButtonClick}>
              나만의 리스트를 만들어보세요!
            </Button>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              marginBottom: MyTheme.width * 20,
            }}>
            <Button
              mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
              style={styles.infoButton}
              buttonColor={MyTheme.colors.primary}
              textColor="white"
              labelStyle={styles.infoText}
              onPress={handleAddButtonClick}>
              + 리스트 추가
            </Button>
            <DefaultFlatList
              data={listNames}
              keyExtractor={(item, index) => index.toString()}
              renderItem={item => (
                <ListItem
                  item={item}
                  onKebabPress={(width, height, x, y) => {
                    handleKebapButtonClick(width, height, x, y)
                    setSelectedItem(item)
                  }}
                  onItemPress={() => handleItemClick(item)}
                />
              )}
              onPressItem={handleItemClick}
            />
          </View>
        )}
      </View>
      <View style={{ alignItems: 'center' }}>
        <InlineAd />
      </View>
      <RandomItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        items={restaurantItems}
        onItemChange={handleRestaurantChange}
        isRestaurantSelection={true}
      />
      <KebapMenuModal
        modalVisible={menuModalVisible}
        modalPosition={modalPosition}
        selectedItem={selectedItem}
        onEdit={handleEditButtonClick}
        onDelete={handleDeleteButtonClick}
        onClose={() => setMenuModalVisible(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MyTheme.width * 30,
    paddingTop: MyTheme.width * 10,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: MyTheme.width * 20,
  },
  infoArea: {
    flex: 1,
    alignItems: 'center',
  },
  infoButton: {
    borderRadius: 10,
    paddingVertical: MyTheme.width * 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: MyTheme.colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: MyTheme.width * 10,
  },
  infoText: {
    fontSize: Platform.select({
      ios: MyTheme.width * 19,
      android: MyTheme.width * 17,
    }),
    paddingTop: MyTheme.width * 5,
  },
})
