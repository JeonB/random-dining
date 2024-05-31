import React from 'react'
import { LocationTypes } from '@_types/restaurant'
import { DataTable, Icon } from 'react-native-paper'
import { Dimensions, Image, Linking, StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'
import mainImage from '@_assetImages/main.png'
import koreanFood from '@_assetImages/korean.png'
import japaneseFood from '@_assetImages/japanese.png'
import chineseFood from '@_assetImages/chinese.png'
import westernFood from '@_assetImages/western.png'
import dduck from '@_assetImages/dduck.png'
import asianFood from '@_assetImages/asian.png'
const RestaurantDetail = ({ info }: { info: LocationTypes }) => {
  function extractMainCategory(categoryName: string) {
    const splitCategory = categoryName.split(' > ')
    return splitCategory[1] // 1번 인덱스 요소는 주요 카테고리 이름
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
        return mainImage
    }
  }
  return (
    <View style={styles.infoView}>
      <Text
        style={{
          width: '80%',
          height: '9%',
          textAlign: 'center',
        }}
        h4
        h4Style={{ fontSize: 25, marginBottom: 5 }}
        numberOfLines={1}
        ellipsizeMode="tail">
        {info?.place_name || ''}
      </Text>

      <View style={{ width: '100%', height: '38%', alignItems: 'center' }}>
        <Image
          style={{ width: '60%', height: '100%', borderRadius: 10 }}
          source={getCategoryImage(info?.category_name || '')}
          resizeMode="stretch"
        />
      </View>
      {/* fetch한 데이터에서 '음식점 > ' 부분 제거 */}
      <Text style={{ fontSize: 18, marginTop: 5 }}>
        {(info?.category_name || '') !== '' ? info.category_name?.slice(5) : ''}
      </Text>
      <DataTable style={{ padding: 1 }}>
        <DataTable.Header>
          <DataTable.Title style={styles.table} textStyle={{ fontSize: 15 }}>
            <Icon source="run" size={24} />
            거리
          </DataTable.Title>
          <DataTable.Title style={styles.table} textStyle={{ fontSize: 15 }}>
            <Icon source="phone" size={24} /> 전화번호
          </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell style={styles.table} textStyle={{ fontSize: 15 }}>
            {info?.distance} m
          </DataTable.Cell>
          <DataTable.Cell
            style={styles.table}
            textStyle={{ color: 'blue', fontSize: 15 }}
            onPress={
              info?.phone
                ? () => Linking.openURL(`tel:${info.phone}`)
                : undefined
            }>
            {info?.phone || '번호가 등록되지 않았습니다.'}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  )
}
const deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  table: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoView: {
    width: deviceWidth > 430 ? 450 : 400,
    alignItems: 'center',
    margin: 1,
  },
})

export default RestaurantDetail
