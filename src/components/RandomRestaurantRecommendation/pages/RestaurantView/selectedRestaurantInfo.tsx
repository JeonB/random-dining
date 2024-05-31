import React, { useEffect, useRef, useState } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  View,
  Platform,
  ScrollView,
  LayoutChangeEvent,
} from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { useRestaurantContext } from '@_components/common/context/restaurantContext'
import { LocationTypes } from '@_types/restaurant'
import Map from './map'
import RestaurantDetail from './restaurantDetail'
import RestaurantActionButtons from './restaurantActionButtons'
import RandomItemModal from './randomItemModal'
import { RestaurantParamList } from '@_types/restaurantParamList'
import mainImage from '@_assetImages/main.png'
import { MyTheme } from 'theme'

const SelectedRestaurantInfo = ({
  route,
  navigation,
}: StackScreenProps<RestaurantParamList, 'SelectedRestaurantInfo'>) => {
  const { restaurantItems, currentLocation, setShowAd } = useRestaurantContext()
  const restaurant: LocationTypes | undefined = route.params?.restaurant
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isMounted = useRef(true)

  useEffect(() => {
    setShowAd(false)
    return () => {
      setShowAd(true)
      isMounted.current = false
    }
  }, [])
  const handleReselectClick = () => {
    setIsLoading(true)
    if (restaurantItems) {
      setModalVisible(true)
      setIsLoading(false)
    } else {
      Alert.alert('식당을 다시 선택할 수 없습니다.')
    }
  }

  const handleRestaurantChange = (index: number) => {
    const selectedRestaurant = restaurantItems[index]
    if (selectedRestaurant) {
      navigation.navigate('SelectedRestaurantInfo', {
        restaurant: selectedRestaurant,
      })
    }
  }
  const [contentHeight, setContentHeight] = useState(0)
  const screenHeight = Dimensions.get('window').height / 300

  const onLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height)
  }

  const Content = restaurant && (
    <View onLayout={onLayout} style={{ width: Dimensions.get('window').width }}>
      <RestaurantDetail info={restaurant} />
      <RestaurantActionButtons
        selectedRestaurant={restaurant}
        handleRandomPickClick={handleReselectClick}
        isLoading={isLoading}
        navigation={navigation}
      />
    </View>
  )
  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {restaurant ? (
          <Map info={restaurant} currentLocation={currentLocation} />
        ) : (
          <Image
            source={mainImage}
            style={{ width: '100%', height: '100%' }}
            onError={({ nativeEvent: { error } }) => console.warn(error)}
          />
        )}
      </View>
      {contentHeight > screenHeight * 150 ? (
        <ScrollView>{Content}</ScrollView>
      ) : (
        Content
      )}
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
    alignItems: 'center',
  },
  mediaContainer: {
    width: Dimensions.get('window').width,
    height: Platform.select({
      ios: MyTheme.width * 230,
      android: MyTheme.width * 220,
    }),
    position: 'relative',
    alignItems: 'center',
    padding: 0,
    marginBottom: 10,
  },
  reselectButton: {
    borderColor: '#003366',
    margin: 15,
    borderRadius: 5,
  },
})

export default SelectedRestaurantInfo
