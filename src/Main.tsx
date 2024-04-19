import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  Dimensions,
  Alert,
} from 'react-native'
import { Text, Slider, Icon } from '@rneui/themed'
import { Button } from 'react-native-paper'
import RestaurantInfo from '@_components/ui/dataView'
import CategoryButton from '@_components/ui/categoryButton'
import { RandomPickerModal } from '@_components/random/randomPickModal'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { fetchData } from '@_services/api'
import { Restaurant } from '@_types/Restaurant'
import { RootStackParamList } from '@_types/navigation'
import Map from '@_components/ui/map'

export function Main() {
  const [info, setInfo] = useState<Restaurant[]>([])
  const [category, setCategory] = useState<string[]>([''])
  const [showRandomPicker, setShowRandomPicker] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState<Restaurant | null>()
  const [distanceRange, setDistanceRange] = useState(30)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const [showRandomPickButton, setShowRandomPickButton] = useState(true)

  const handleRandomPickClick = async () => {
    try {
      await handleData(category)
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }

  const handleDetailViewClick = () => {
    if (selectedInfo) {
      navigation.navigate('Detail', { url: selectedInfo.place_url })
    }
  }

  const handleCategoryChange = (itemIndex: number) => {
    setSelectedInfo(info[itemIndex])
    setTimeout(() => setShowRandomPicker(false), 600)
  }

  const allData: Restaurant[] = []

  async function handleData(categories: string[]) {
    let page = 1
    try {
      if (categories[0] === '') {
        categories = ['한식', '중식', '일식', '양식', '분식']
      }
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)]
      let data = await fetchData(randomCategory, page, distanceRange)

      // Kakao Local API는 최대 3페이지까지(45개) 데이터 제공
      while (page < 4) {
        data.documents.forEach((document: Restaurant) => {
          allData.push(document)
          // cnt++;
        })
        if (data.meta.is_end) break
        page++
        data = await fetchData(randomCategory, page, distanceRange)
      }
    } catch (error) {
      console.error('에러 발생:', error)
    }

    if (allData.length === 0) {
      Alert.alert('주변에 식당이 없습니다. 거리 범위를 조정해주세요.')
      return
    }

    setInfo(allData)
    setShowRandomPicker(true)
    setShowRandomPickButton(false)
    return allData
  }

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {selectedInfo ? (
          <Map info={selectedInfo} />
        ) : (
          <Image
            source={{ uri: 'https://i.postimg.cc/rpJGytmg/image.png' }}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </View>
      <CategoryButton category={category} setCategory={setCategory} />
      <View style={[styles.contentView]}>
        <Slider
          value={distanceRange}
          onValueChange={setDistanceRange}
          maximumValue={300}
          minimumValue={30}
          step={10}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                type="font-awesome"
                size={15}
                reverse
                containerStyle={{ bottom: 15, right: 10 }}
                name={''}
              />
            ),
          }}
        />
        <Text>{distanceRange}m 이내</Text>
      </View>
      {selectedInfo && (
        <View style={styles.infoView}>
          <Text h4 h4Style={{ fontSize: 20, marginBottom: 10 }}>
            {selectedInfo?.place_name || ''}
          </Text>
          <Text>{selectedInfo?.category_name || ''}</Text>

          <RestaurantInfo info={selectedInfo} />
        </View>
      )}
      {showRandomPickButton ? (
        <Button
          style={styles.randomPickButton}
          icon="silverware-fork-knife"
          onPress={handleRandomPickClick}
          textColor="#003366">
          Random Pick
        </Button>
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <Button onPress={handleDetailViewClick} style={styles.detailButton}>
            <Text style={{ color: 'white' }}>식당 상세 정보</Text>
          </Button>
          <Button
            style={styles.reselectButton}
            icon="restart"
            onPress={handleRandomPickClick}
            mode="outlined"
            textColor="#003366">
            다시 선택
          </Button>
        </View>
      )}
      {info.length > 0 && (
        <RandomPickerModal
          visible={showRandomPicker}
          info={info}
          onClose={() => setShowRandomPicker(false)}
          onIndexChange={handleCategoryChange}
        />
      )}
    </View>
  )
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: 'center',
  },
  randomPickButton: {
    margin: 20,
    padding: 4,
    width: 300,
    height: 50,
    textAlign: 'center',
    backgroundColor: '#E8EAF6',
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
  infoView: {
    width: deviceWidth > 430 ? 450 : 400,
    alignItems: 'center',
    margin: 5,
  },
  mediaContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.7,
    position: 'relative',
    alignItems: 'center',
    padding: 0,
    margin: 10,
  },
  image: {
    width: deviceWidth > 430 ? '110%' : '120%',
    height: 'auto',
    aspectRatio: 1,
  },
  contentView: {
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
})
