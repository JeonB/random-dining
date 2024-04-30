import React from 'react'
import { Restaurant } from '@_types/restaurant'
import { DataTable, Icon } from 'react-native-paper'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'

export const RestaurantDetail = ({ info }: { info: Restaurant }) => {
  return (
    <View style={styles.infoView}>
      <Text h4 h4Style={{ fontSize: 20, marginBottom: 10 }}>
        {info?.place_name || ''}
      </Text>
      <Text>{info?.category_name || ''}</Text>

      <DataTable style={{ padding: 5 }}>
        <DataTable.Header>
          <DataTable.Title style={styles.table}>
            <Icon source="run" size={0} />
            거리
          </DataTable.Title>
          <DataTable.Title style={styles.table}>
            <Icon source="phone" size={0} /> 전화번호
          </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell style={styles.table}>{info?.distance}</DataTable.Cell>
          <DataTable.Cell style={styles.table}>{info?.phone}</DataTable.Cell>
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
    margin: 5,
  },
})
