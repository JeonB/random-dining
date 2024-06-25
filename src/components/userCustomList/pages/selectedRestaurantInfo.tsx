import React, { useState } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  LayoutChangeEvent,
  Platform,
  ScrollView,
} from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Text } from '@rneui/themed'
import { MyTheme } from 'theme'
import { RootStackParamList, LocationTypes } from '@_types'
import Map from '@_common/ui/map'
import RestaurantDetail from '@_3Rpages/RestaurantView/restaurantDetail'
import RandomItemModal from '@_common/ui/randomItemModal'
import { useRestaurantContext } from '@_common/context/restaurantContext'
import RestaurantActionButtons from '@_userListPages/restaurantActionButtons'

export const SelectedRestaurantInfo = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'UserSelectedRestaurantInfo'>) => {
  const { currentLocation } = useRestaurantContext()

  const restaurant: LocationTypes | undefined = route.params?.restaurant
  const listName: string | undefined = route.params?.listname

  const [modalVisible, setModalVisible] = useState(false)
  const [restaurantItems, setRestaurantItems] = useState<LocationTypes[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleRestaurantChange = (index: number) => {
    const selectedRestaurant = restaurantItems[index]

    if (selectedRestaurant) {
      navigation.navigate('UserSelectedRestaurantInfo', {
        restaurant: selectedRestaurant,
        listname: listName,
        restaurantList: restaurantItems,
      })
    }
  }

  const handleRandomPickClick = async () => {
    try {
      setRestaurantItems(route.params?.restaurantList)
      setModalVisible(true)
    } catch (error) {
      console.error('Error loading list data:', error)
    }
  }

  const [contentHeight, setContentHeight] = useState(0)
  const screenHeight = Dimensions.get('window').height / 300

  const onLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height)
  }

  const Content = (
    <View onLayout={onLayout} style={{ width: Dimensions.get('window').width }}>
      {restaurant.category_name ? (
        <RestaurantDetail info={restaurant} />
      ) : (
        <View style={styles.infoView}>
          <Text
            style={{
              width: '80%',
              textAlign: 'center',
            }}
            h4
            h4Style={{
              fontSize: MyTheme.width * 25,
              fontWeight: 'bold',
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {restaurant?.place_name || ''}
          </Text>
        </View>
      )}
      <RestaurantActionButtons
        selectedRestaurant={restaurant}
        handleRandomPickClick={handleRandomPickClick}
        isLoading={isLoading}
        navigation={navigation}
        listName={listName}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      {restaurant.x ? (
        <View style={styles.mapContainer}>
          <Map info={restaurant} currentLocation={currentLocation} />
        </View>
      ) : (
        <View style={styles.mediaContainer}>
          <Image
            source={require('../../../../assets/icon.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      )}
      {contentHeight > screenHeight * 150 ? (
        <ScrollView>{Content}</ScrollView>
      ) : (
        Content
      )}
      <RandomItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        items={restaurantItems.map(item => item.place_name)}
        onIndexChange={handleRestaurantChange}
      />
    </View>
  )
}
const deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  infoView: {
    width: deviceWidth,
    alignItems: 'center',
    marginBottom: 30,
  },
  mapContainer: {
    width: deviceWidth,
    height: Platform.select({
      ios: MyTheme.width * 230,
      android: MyTheme.width * 220,
    }),
    position: 'relative',
    alignItems: 'center',
    padding: 0,
    marginBottom: 10,
  },
  mediaContainer: {
    width: deviceWidth * 0.9,
    height: deviceWidth * 0.9,
    position: 'relative',
    alignItems: 'center',
    padding: 20,
  },
  reselectButton: {
    borderColor: '#003366',
    margin: 15,
    borderRadius: 5,
  },
  detailButton: {
    backgroundColor: '#2E6FCF',
    borderRadius: 5,
    width: 200,
    margin: 15,
  },
})
