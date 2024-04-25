import React from 'react'
import { Restaurant } from '@_types/restaurant'
import { DataTable, Icon } from 'react-native-paper'
import { StyleSheet } from 'react-native'

export const RestaurantInfo = ({ info }: { info: Restaurant }) => {
  return (
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
  )
}

const styles = StyleSheet.create({
  table: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
