import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { Text } from '@rneui/themed'
import { NavigationProp } from '@react-navigation/native'
import { LocationTypes } from '@_types/restaurant'
import { RootStackParamList } from '@_types/listParamList'
import RandomPickButton from '@_3Rpages/FilterSettings/randomPickButton'
import { AddUserListModal } from '@_userListPages/addUserListModal'

interface Props {
  selectedRestaurant: LocationTypes
  handleRandomPickClick: () => void
  isLoading: boolean
  navigation: NavigationProp<RootStackParamList>
  listName: string
}

const RestaurantActionButtons = ({
  selectedRestaurant: restaurant,
  handleRandomPickClick,
  isLoading,
  navigation,
  listName,
}: Props) => {
  const handleDetailViewClick = () => {
    if (restaurant && restaurant.place_url) {
      navigation.navigate('Detail', { url: restaurant.place_url })
    }
  }
  const [modalVisible, setModalVisible] = useState(false)

  const handleEditButtonClick = () => {
    navigation.navigate('EditUserList', { listName: listName })
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {restaurant.place_url ? (
          <Button onPress={handleDetailViewClick} style={[styles.detailButton]}>
            <Text style={styles.detailButtonText}>식당 상세 정보</Text>
          </Button>
        ) : (
          <Button onPress={handleEditButtonClick} style={[styles.detailButton]}>
            <Text style={styles.detailButtonText}>리스트 수정</Text>
          </Button>
        )}

        <Button
          onPress={() => setModalVisible(true)}
          style={styles.detailButton}>
          <Text style={styles.detailButtonText}>리스트 추가</Text>
        </Button>
      </View>
      <AddUserListModal
        selectedInfo={restaurant}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <RandomPickButton
        handleRandomPickClick={handleRandomPickClick}
        isLoading={isLoading}
        icon="autorenew"
        text="다시 선택"
        style={{
          width: Dimensions.get('window').width * 0.85,
          height: Dimensions.get('window').height * 0.05,
          marginTop: 10,
          justifyContent: 'center',
        }}
        labelStyle={{ fontSize: 25, padding: 6 }}
      />
    </View>
  )
}
export default RestaurantActionButtons

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },
  detailButton: {
    backgroundColor: '#6690FF',
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailButtonText: {
    color: '#FFFDD0',
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
})
