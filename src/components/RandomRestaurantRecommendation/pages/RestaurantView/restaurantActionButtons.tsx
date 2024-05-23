import React, { useState } from 'react'
import { Dimensions, Platform, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { Text } from '@rneui/themed'
import { NavigationProp } from '@react-navigation/native'
import { LocationTypes } from '@_types/restaurant'
import RandomPickButton from '@_3Rpages/FilterSettings/randomPickButton'
import { AddUserListModal } from '@_components/userCustomList/pages/addUserListModal'
import { RestaurantParamList } from '@_types/restaurantParamList'
import { MyTheme } from 'theme'
interface Props {
  selectedRestaurant: LocationTypes
  handleRandomPickClick: () => void
  isLoading: boolean
  navigation: NavigationProp<RestaurantParamList>
}

const RestaurantActionButtons = ({
  selectedRestaurant: restaurant,
  handleRandomPickClick,
  isLoading,
  navigation,
}: Props) => {
  const handleDetailViewClick = () => {
    if (restaurant && restaurant.place_url) {
      navigation.navigate('Detail', { url: restaurant.place_url })
    }
  }
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          mode="elevated"
          onPress={handleDetailViewClick}
          style={styles.detailButton}>
          <Text style={styles.detailButtonText}>식당 상세 정보</Text>
        </Button>
        <Button
          mode="elevated"
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
        labelStyle={{
          fontSize: 25,
          paddingTop: Platform.select({ ios: 6, android: 10 }),
        }}
      />
    </View>
  )
}
export default RestaurantActionButtons

const styles = StyleSheet.create({
  container: {
    marginTop: -40,
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
    paddingTop: Platform.select({ ios: 1, android: 3 }),
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: MyTheme.colors.secondary,
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
    color: '#e6e6fA',
    fontSize: Dimensions.get('window').width > 390 ? 19 : 17,
  },
})
