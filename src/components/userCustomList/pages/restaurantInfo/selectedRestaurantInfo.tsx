import React, { useCallback, useState } from 'react'
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
import { useRestaurantContext } from '@_common/context/restaurantContext'
import { useStore } from '@_common/utils/zustandStore'
import RandomRestaurantMap from '@_common/ui/randomRestaurantMap'
import RandomItemModal from '@_common/ui/randomItemModal'
import RestaurantDetail from '@_common/ui/restaurantDetail'
import RestaurantActionButtons from '@_userListPages/restaurantInfo/restaurantActionButtons'

export const SelectedRestaurantInfo = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'UserSelectedRestaurantInfo'>) => {
  const { currentLocation } = useRestaurantContext()
  const listName = route.params?.listname
  const [modalVisible, setModalVisible] = useState(false)
  const [restaurantItems, setRestaurantItems] = useState<LocationTypes[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const randomRestaurant = useStore(set => set.randomRestaurant)

  const handleRestaurantChange = useCallback(() => {
    navigation.navigate('UserSelectedRestaurantInfo', {
      listname: listName,
      restaurantList: restaurantItems,
    })
  }, [restaurantItems])

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
      {randomRestaurant.place_url ? (
        <RestaurantDetail />
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
            {randomRestaurant.place_name}
          </Text>
        </View>
      )}
      <RestaurantActionButtons
        handleRandomPickClick={handleRandomPickClick}
        isLoading={isLoading}
        navigation={navigation}
        listName={listName}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      {randomRestaurant.x ? (
        <View style={styles.mapContainer}>
          <RandomRestaurantMap currentLocation={currentLocation} />
        </View>
      ) : (
        <View style={styles.mediaContainer}>
          <Image
            source={require('@_assetImages/character.png')}
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
        items={restaurantItems}
        onItemChange={handleRestaurantChange}
        isRestaurantSelection={true}
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
