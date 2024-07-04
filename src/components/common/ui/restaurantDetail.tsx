import React from 'react'
import { DataTable, Icon } from 'react-native-paper'
import { Image, Linking, StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'
import koreanFood from '@_assetImages/korean.png'
import japaneseFood from '@_assetImages/japanese.jpeg'
import chineseFood from '@_assetImages/chinese.png'
import westernFood from '@_assetImages/western.jpeg'
import dduck from '@_assetImages/dduck.png'
import asianFood from '@_assetImages/asian.png'
import midnightSnack from '@_assetImages/midnightSnack.png'
import { MyTheme } from 'theme'
import { useStore } from '@_common/utils/zustandStore'

const RestaurantDetail = () => {
  const randomRestaurant = useStore(state => state.randomRestaurant)

  function extractMainCategory(categoryName: string) {
    const splitCategory = categoryName.split(' > ')
    return splitCategory[1]
  }

  function getCategoryImage(categoryName: string) {
    const mainCategory = extractMainCategory(categoryName)
    switch (mainCategory) {
      case '한식':
        return koreanFood
      case '일식':
        return japaneseFood
      case '중식':
        return chineseFood
      case '양식':
        return westernFood
      case '분식':
        return dduck
      case '아시아음식':
        return asianFood
      default:
        return midnightSnack
    }
  }

  return (
    <View style={styles.infoView}>
      <Text
        style={styles.restaurantName}
        h4
        h4Style={styles.restaurantNameLabel}
        numberOfLines={1}
        ellipsizeMode="tail">
        {randomRestaurant.place_name || ''}
      </Text>

      <Image
        style={styles.image}
        source={getCategoryImage(randomRestaurant.category_name || '')}
        resizeMode="stretch"
      />
      {/* fetch한 데이터에서 '음식점 > ' 부분 제거 */}
      <Text style={styles.categoryNameLabel}>
        {(randomRestaurant?.category_name || '') !== ''
          ? randomRestaurant.category_name?.slice(5)
          : ''}
      </Text>
      <DataTable style={{ padding: MyTheme.width * 1 }}>
        <DataTable.Header>
          <DataTable.Title style={styles.table} textStyle={styles.tableText}>
            <Icon source="run" size={MyTheme.width * 24} />
            거리
          </DataTable.Title>
          <DataTable.Title style={styles.table} textStyle={styles.tableText}>
            <Icon source="phone" size={MyTheme.width * 24} /> 전화번호
          </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell style={styles.table} textStyle={styles.tableText}>
            {randomRestaurant.distance} m
          </DataTable.Cell>
          <DataTable.Cell
            style={styles.table}
            textStyle={{ ...styles.tableText, color: 'blue' }}
            onPress={
              randomRestaurant.phone
                ? () => Linking.openURL(`tel:${randomRestaurant.phone}`)
                : undefined
            }>
            {randomRestaurant.phone || '번호가 등록되지 않았습니다.'}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  )
}
const styles = StyleSheet.create({
  infoView: {
    width: MyTheme.width * 400,
    alignItems: 'center',
    alignSelf: 'center',
    margin: MyTheme.width * 2,
  },
  restaurantName: {
    width: MyTheme.width * 330,
    height: MyTheme.width * 40,
    textAlign: 'center',
  },
  restaurantNameLabel: {
    fontSize: MyTheme.width * 25,
    marginBottom: MyTheme.width * 2,
    fontWeight: 'normal',
  },
  image: {
    width: MyTheme.width * 200,
    height: MyTheme.width * 100,
    borderRadius: 10,
  },
  categoryNameLabel: {
    fontSize: MyTheme.width * 18,
    marginTop: MyTheme.width * 10,
    fontWeight: 'normal',
  },
  table: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableText: {
    fontSize: MyTheme.width * 15,
  },
})

export default RestaurantDetail
