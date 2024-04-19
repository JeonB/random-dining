import React from 'react';
import { Restaurant } from '@_types/Restaurant';
import { DataTable, Icon } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function RestaurantInfo({
  info,
}: {
  info: Restaurant | undefined;
}) {
  return (
    <DataTable style={{ padding: 5 }}>
      <DataTable.Header>
        {/* <DataTable.Title>상세 정보</DataTable.Title> */}
        <DataTable.Title style={styles.table}>
          <Icon source="run" />
          거리
        </DataTable.Title>
        <DataTable.Title style={styles.table}>
          <Icon source="phone" /> 전화번호
        </DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        {/* <DataTable.Cell>
          <Button
            icon="food"
            onPress={() => handleIconClick(info[0])}
            style={{
              backgroundColor: "#a18cd1",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>식당 정보</Text>
          </Button>
        </DataTable.Cell> */}

        <DataTable.Cell style={styles.table}>{info?.distance}</DataTable.Cell>
        <DataTable.Cell style={styles.table}>{info?.phone}</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
}

const styles = StyleSheet.create({
  table: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
