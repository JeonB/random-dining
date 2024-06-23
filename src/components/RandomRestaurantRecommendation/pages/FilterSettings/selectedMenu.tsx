import React, { useCallback, useRef, useState } from 'react'
import {
  View,
  Image,
  Dimensions,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native'
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

export const SelectedMenu = ({
  route,
  navigation,
}: StackScreenProps<RestaurantParamList, 'SelectedMenu'>) => {
  const [isChanging, setIsChanging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const isMounted = useRef(true)
  const { menu, setRestaurantItems, selectedLocation, distance } = useStore()
  const selectedData = route.params?.items
  if (!selectedData) {
    // selectedData가 undefined일 때 처리하는 로직
    throw new Error('No data')
  }
  const handleMenuChange = useCallback(() => {
    if (isChanging) return // 이미 변경 중이면 무시
    setIsChanging(true) // 변경 시작
    navigation.navigate('SelectedMenu', { items: selectedData })

    setIsChanging(false) // 변경 완료
  }, [isChanging, selectedData])

  // 레스토랑 데이터를 가져오는 과정을 시작하고, 해당 과정이 완료되면 로딩 상태를 업데이트
  const handleRandomPickClick = useCallback(() => {
    setIsLoading(true)
    setModalVisible(true)
    if (isMounted.current) {
      setIsLoading(false)
    }
  }, [])
  const handleRestaurantViewClick = async () => {
    const restaurantItems = await fetchLocationData(
      menu,
      String(selectedLocation.longitude),
      String(selectedLocation.latitude),
      'FD6',
      distance,
    )
    try {
      if (restaurantItems !== null && restaurantItems.length > 0) {
        setRestaurantItems(restaurantItems)
        navigation.navigate('RestaurantView', {
          restaurantItems: restaurantItems,
        })
      } else {
        Alert.alert(
          '주변에 식당이 없습니다. 거리 범위를 조정해주세요.',
          '',
          [
            {
              text: '확인',
              onPress: () => navigation.goBack(), // Use navigation.goBack() to navigate back
            },
          ],
          { cancelable: false },
        )
      }
    } catch (error) {
      console.error(error)
      Alert.alert('예기치 못 한 에러가 발생했습니다. 다시 시도하여 주세요.')
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
          onError={({ nativeEvent: { error } }) => console.warn(error)}
        />
        <Text style={{ fontSize: 30 }}>{menu}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
          onPress={handleRestaurantViewClick}
          style={styles.detailButton}>
          <Text style={styles.buttonLabel}>주변 가게 보기</Text>
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
        onItemChange={handleMenuChange}
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
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.15,
    width: MyTheme.width * 300,
    height: MyTheme.width * 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: MyTheme.width * 220,
    height: Platform.select({
      ios: MyTheme.width * 40,
      android: MyTheme.width * 35,
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
      android: MyTheme.width * 20,
    }),
    lineHeight: MyTheme.width * 23,
  },
  detailButton: {
    backgroundColor: MyTheme.colors.secondary,
    marginBottom: MyTheme.width * 10,
    borderRadius: 30,
    width: MyTheme.width * 220,
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
})

export default SelectedMenu
