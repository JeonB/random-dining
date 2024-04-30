import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { Text } from '@rneui/themed'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@_types/navigation'
import { Restaurant } from '@_types/restaurant'
import RandomPickButton from '../FilterSettings/randomPickButton'

interface RandomPickButtonProps {
  selectedRestaurant: Restaurant
  handleRandomPickClick: () => void
  isLoading: boolean
  text: string
  navigation: NavigationProp<RootStackParamList>
}

const RestaurantActionButtons = ({
  selectedRestaurant: restaurant,
  handleRandomPickClick,
  isLoading,
  text,
  navigation,
}: RandomPickButtonProps) => {
  const handleDetailViewClick = () => {
    if (restaurant) {
      navigation.navigate('Detail', { url: restaurant.place_url })
    }
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <Button onPress={handleDetailViewClick} style={styles.detailButton}>
        <Text style={{ color: 'white' }}>식당 상세 정보</Text>
      </Button>
      <RandomPickButton
        handleRandomPickClick={handleRandomPickClick}
        isLoading={isLoading}
        text={text}
      />
    </View>
  )
}
export default RestaurantActionButtons

const styles = StyleSheet.create({
  reselectButton: {
    borderColor: '#003366',
    margin: 15,
    borderRadius: 5,
  },
  detailButton: {
    backgroundColor: '#2E6FCF',
    borderRadius: 5,
    width: 200,
    marginRight: 10,
  },
})
