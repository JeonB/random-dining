import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { RestaurantParamList } from '@_types'
import mainImage from '@_assetImages/main.png'
import { MyTheme } from 'theme'
import { useStore } from '@_common/utils/zustandStore'
import RandomRestaurantMap from '@_common/ui/randomRestaurantMap'
import RandomItemModal from '@_common/ui/randomItemModal'
import Content from '@_3Rpages/RestaurantView/content'

const SelectedRestaurantInfo = ({
  route,
  navigation,
}: StackScreenProps<RestaurantParamList, 'SelectedRestaurantInfo'>) => {
  const { currentLocation, setShowAd } = useStore()
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isMounted = useRef(true)
  const { restaurantItems, randomRestaurant } = useStore(state => ({
    restaurantItems: state.restaurantItems,
    randomRestaurant: state.randomRestaurant,
  }))

  useEffect(() => {
    setShowAd(false)
    return () => {
      setShowAd(true)
      isMounted.current = false
    }
  }, [])

  const handleReselectClick = useCallback(() => {
    setIsLoading(true)
    if (restaurantItems) {
      setModalVisible(true)
      setIsLoading(false)
    } else {
      Alert.alert('식당을 다시 선택할 수 없습니다.')
    }
  }, [restaurantItems])

  const handleRestaurantChange = useCallback(() => {
    const selectedRestaurant = restaurantItems[1]
    if (selectedRestaurant) {
      navigation.navigate('SelectedRestaurantInfo')
    }
  }, [restaurantItems, navigation])
  const [contentHeight, setContentHeight] = useState(0)
  const screenHeight = Dimensions.get('window').height / 300

  const onLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height)
  }

  const ContentComponent =
    randomRestaurant &&
    useMemo(
      () => (
        <Content
          onLayout={onLayout}
          handleReselectClick={handleReselectClick}
          isLoading={isLoading}
          navigation={navigation}
        />
      ),
      [onLayout, randomRestaurant, handleReselectClick, isLoading, navigation],
    )
  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {randomRestaurant.x ? (
          <RandomRestaurantMap currentLocation={currentLocation} />
        ) : (
          <Image
            source={mainImage}
            style={{ width: '100%', height: '100%' }}
            onError={({ nativeEvent: { error } }) => console.warn(error)}
          />
        )}
      </View>
      {contentHeight > screenHeight * 150 ? (
        <ScrollView>{ContentComponent}</ScrollView>
      ) : (
        ContentComponent
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
