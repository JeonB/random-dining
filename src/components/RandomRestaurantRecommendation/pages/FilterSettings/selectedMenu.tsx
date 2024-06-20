import React, { useReducer } from 'react'
import { View, Image, Dimensions, Platform, StyleSheet } from 'react-native'
import RandomItemModal from '@_common/ui/randomItemModal'
import { MyTheme } from 'theme'
import { RestaurantParamList } from '@_types'
import { StackScreenProps } from '@react-navigation/stack'
import RandomPickButton from './randomPickButton'
import { Button } from 'react-native-paper'
import { useStore } from '@_common/utils/zustandStore'
import { Text } from '@rneui/themed'
import { fetchLocationData } from '@_services/api'

interface State {
  modalVisible: boolean
  isChanging: boolean
  isLoading: boolean
}

interface Action {
  type: string
  payload: any
}
const initialState = {
  modalVisible: false,
  isChanging: false,
  isLoading: false,
}
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_MODAL_VISIBLE':
      return { ...state, modalVisible: action.payload }
    case 'SET_IS_CHANGING':
      return { ...state, isChanging: action.payload }
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      throw new Error()
  }
}
interface DataType {
  [key: string]: any
}
const images: DataType = {
  스테이크:
    'https://img.freepik.com/free-photo/fried-steak-pieces-wooden-board-garlic_140725-4719.jpg?t=st=1718776404~exp=1718780004~hmac=be7c6b242989d8a511cf8f259d9a6795085baedab170180fe9693eeebc025565&w=826',
  파스타:
    'https://img.freepik.com/free-photo/spaghetti-meatballs_1339-3006.jpg?t=st=1718776607~exp=1718780207~hmac=e6e20b55b90e90832626e51a25fbfcdaa405b5975e0674b306a1e56cc5e7e210&w=996',
  피자: 'https://img.freepik.com/free-photo/fried-steak-pieces-wooden-board-garlic_140725-4719.jpg?t=st=1718776404~exp=1718780004~hmac=be7c6b242989d8a511cf8f259d9a6795085baedab170180fe9693eeebc025565&w=826',
  햄버거:
    'https://img.freepik.com/free-photo/fried-steak-pieces-wooden-board-garlic_140725-4719.jpg?t=st=1718776404~exp=1718780004~hmac=be7c6b242989d8a511cf8f259d9a6795085baedab170180fe9693eeebc025565&w=826',
  라자냐:
    'https://img.freepik.com/free-photo/fried-steak-pieces-wooden-board-garlic_140725-4719.jpg?t=st=1718776404~exp=1718780004~hmac=be7c6b242989d8a511cf8f259d9a6795085baedab170180fe9693eeebc025565&w=826',
  샐러드:
    'https://img.freepik.com/free-photo/fried-steak-pieces-wooden-board-garlic_140725-4719.jpg?t=st=1718776404~exp=1718780004~hmac=be7c6b242989d8a511cf8f259d9a6795085baedab170180fe9693eeebc025565&w=826',
  뇨키: 'https://img.freepik.com/free-photo/fried-steak-pieces-wooden-board-garlic_140725-4719.jpg?t=st=1718776404~exp=1718780004~hmac=be7c6b242989d8a511cf8f259d9a6795085baedab170180fe9693eeebc025565&w=826',
  // ... 나머지 이미지들
}

export const SelectedMenu = ({
  route,
  navigation,
}: StackScreenProps<RestaurantParamList, 'SelectedMenu'>) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { menu, setRestaurantItems, selectedLocation, distance } = useStore()
  const selectedData = route.params?.items
  if (!selectedData) {
    // selectedData가 undefined일 때 처리하는 로직
    throw new Error('No data')
  }
  const handleMenuChange = () => {
    if (state.isChanging) return
    dispatch({ type: 'SET_IS_CHANGING', payload: true })
    dispatch({ type: 'SET_IS_CHANGING', payload: false })
  }

  const handleRandomPickClick = () => {
    dispatch({ type: 'SET_IS_LOADING', payload: true })
    dispatch({ type: 'SET_MODAL_VISIBLE', payload: true })
    dispatch({ type: 'SET_IS_LOADING', payload: false })
  }
  const handleRestaurantViewClick = async () => {
    const restaurantItems = await fetchLocationData(
      menu,
      String(selectedLocation.longitude),
      String(selectedLocation.latitude),
      'FD6',
      distance,
    )
    if (restaurantItems !== null) {
      setRestaurantItems(restaurantItems)

      navigation.navigate('RestaurantView', {
        restaurantItems: restaurantItems,
      })
    }
  }

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
          isLoading={state.isLoading}
          icon="chat-question-outline"
          text="다시 선택"
          style={styles.button}
          labelStyle={styles.buttonLabel}
        />
      </View>
      <RandomItemModal
        visible={state.modalVisible}
        onClose={() => dispatch({ type: 'SET_MODAL_VISIBLE', payload: false })}
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
