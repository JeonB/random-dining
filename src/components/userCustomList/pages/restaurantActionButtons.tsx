import React, { useState } from 'react'
import { Dimensions, Platform, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { Text } from '@rneui/themed'
import { NavigationProp } from '@react-navigation/native'
import { MyTheme } from 'theme'
import { LocationTypes, RootStackParamList } from '@_types'
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
          <Button
            mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
            onPress={handleDetailViewClick}
            style={[styles.detailButton]}>
            <Text style={styles.detailButtonText}>식당 상세 정보</Text>
          </Button>
        ) : (
          <Button
            mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
            onPress={handleEditButtonClick}
            style={[styles.detailButton]}>
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
        style={styles.randomPickButton}
        labelStyle={styles.randomPickButtonLabel}
      />
    </View>
  )
}
export default RestaurantActionButtons

const styles = StyleSheet.create({
  container: {
    marginTop: MyTheme.width * 3,
    marginBottom: MyTheme.width * 10,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '83%',
  },
  detailButton: {
    backgroundColor: MyTheme.colors.secondary,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.4,
    justifyContent: 'center',
    height: Platform.select({
      ios: MyTheme.width * 40,
      android: MyTheme.width * 35,
    }),
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
    color: '#e6e6fA',
    fontSize: Platform.select({
      ios: MyTheme.width * 17,
      android: MyTheme.width * 16,
    }),
    lineHeight: MyTheme.width * 18,
  },
  randomPickButton: {
    width: Dimensions.get('window').width * 0.85,
    height: Platform.select({
      ios: MyTheme.width * 42,
      android: MyTheme.width * 40,
    }),
    marginTop: MyTheme.width * 10,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        backgroundColor: MyTheme.colors.primary,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  randomPickButtonLabel: {
    padding: 0,
    fontSize: Platform.select({
      ios: MyTheme.width * 25,
      android: MyTheme.width * 20,
    }),
    lineHeight: Platform.select({
      ios: MyTheme.width * 26,
      android: MyTheme.width * 24,
    }),
  },
})
