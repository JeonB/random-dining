import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Dimensions, Platform, StyleSheet, Alert } from 'react-native'
import RandomItemModal from '@_common/ui/randomItemModal'
import { MyTheme } from 'theme'
import { RestaurantParamList } from '@_types'
import { StackScreenProps } from '@react-navigation/stack'
import RandomPickButton from './randomPickButton'
import { Button } from 'react-native-paper'
import { useStore } from '@_common/utils/zustandStore'
import { Text } from '@rneui/themed'
import { fetchLocationData } from '@_services/api'
import { images } from './images'
import { Image } from 'expo-image'

export const SelectedMenu = ({
  route,
  navigation,
}: StackScreenProps<RestaurantParamList, 'SelectedMenu'>) => {
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const isMounted = useRef(true)
  const { menu, setRestaurantItems, selectedLocation, distance } = useStore()
  const selectedData = route.params?.items
  if (!selectedData) {
    // selectedData가 undefined일 때 처리하는 로직
    throw new Error('No data')
  }
  // 레스토랑 데이터를 가져오는 과정을 시작하고, 해당 과정이 완료되면 로딩 상태를 업데이트
  const handleRandomPickClick = useCallback(() => {
    setIsLoading(true)
    setModalVisible(true)
    if (isMounted.current) {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const imageUrls = Object.values(images)
    Image.prefetch(imageUrls).catch(error => {
      console.error('Error preloading images:', error)
    })
  }, [])

  const handleRestaurantViewClick = async () => {
    const restaurantItems = await fetchLocationData(
      menu,
      String(selectedLocation.longitude),
      String(selectedLocation.latitude),
      'FD6',
      distance,
      'distance',
    )
    try {
      if (restaurantItems !== null && restaurantItems.length > 0) {
        setRestaurantItems(restaurantItems)
        navigation.navigate('RestaurantView', {
          restaurantItems: restaurantItems,
        })
      } else {
        Alert.alert(
          `${distance}m 이내에 ${menu}를(을) 판매하는 식당이 없습니다.`,
          '',
          [
            {
              text: '확인',
            },
          ],
          { cancelable: false },
        )
      }
    } catch (error) {
      console.error(error)
      Alert.alert('예기치 못한 에러가 발생했습니다. 다시 시도하여 주세요.')
    }
  }
  const handleClose = useCallback(() => {
    setModalVisible(false)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        <Image
          source={{ uri: images[menu] }}
          style={styles.image}
          transition={{ timing: 'ease-in-out' }}
        />
        <Text style={{ fontSize: MyTheme.width * 30 }}>{menu}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
          onPress={handleRestaurantViewClick}
          style={styles.detailButton}>
          <Text style={styles.detailButtonLabel}>주변 가게 보기</Text>
        </Button>
        <RandomPickButton
          handleRandomPickClick={handleRandomPickClick}
          isLoading={isLoading}
          icon="chat-question-outline"
          text="다시 선택"
          style={styles.button}
          labelStyle={styles.buttonLabel}
        />
      </View>
      <RandomItemModal
        visible={modalVisible}
        onClose={handleClose}
        items={selectedData}
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
    width: MyTheme.width * 350,
    height: MyTheme.width * 400,
    position: 'relative',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    marginTop: MyTheme.width * 50,
    marginBottom: MyTheme.width * 10,
    width: Platform.select({
      ios: MyTheme.width * 300,
      android: MyTheme.width * 290,
    }),
    height: MyTheme.width * 280,
    borderRadius: 30,
  },
  buttonContainer: {
    marginTop: MyTheme.width * 10,
    width: MyTheme.width * 300,
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: MyTheme.width * 220,
    height: Platform.select({
      ios: MyTheme.width * 40,
      android: MyTheme.width * 38,
    }),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: MyTheme.colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  buttonLabel: {
    color: '#e6e6fA',
    fontSize: Platform.select({
      ios: MyTheme.width * 22,
      android: MyTheme.width * 21,
    }),
    lineHeight: Platform.select({
      ios: MyTheme.width * 25,
      android:
        Dimensions.get('window').width > 440
          ? MyTheme.width * 25
          : MyTheme.width * 21,
    }),
  },
  detailButton: {
    backgroundColor: MyTheme.colors.secondary,
    marginBottom: MyTheme.width * 10,
    borderRadius: 30,
    width: MyTheme.width * 220,
    paddingTop: Platform.select({
      android:
        Dimensions.get('window').width > 440
          ? MyTheme.width * 3
          : MyTheme.width * 1,
    }),
    justifyContent: 'center',
    height: MyTheme.width * 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailButtonLabel: {
    color: '#e6e6fA',
    fontSize: Platform.select({
      ios: MyTheme.width * 22,
      android: MyTheme.width * 21,
    }),
    lineHeight: Platform.select({
      ios: MyTheme.width * 25,
      android:
        Dimensions.get('window').width > 440
          ? MyTheme.width * 30
          : MyTheme.width * 25,
    }),
  },
})

export default SelectedMenu
