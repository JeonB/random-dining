import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'
import { LocationTypes } from '@_types'

interface RenderItemProps {
  item: LocationTypes
  handlePressAddButton: (newItem: LocationTypes) => void
}

const RenderItem = ({ item, handlePressAddButton }: RenderItemProps) => (
  <View style={styles.renderItem}>
    <View style={{ flexShrink: 1 }}>
      <Text style={styles.listText} numberOfLines={1} ellipsizeMode="tail">
        {item.place_name}
      </Text>
      <Text style={{ fontSize: 13 }} numberOfLines={1} ellipsizeMode="tail">
        ({item.address_name})
      </Text>
    </View>
    <View style={{ width: 50 }}>
      <Button
        textColor={MyTheme.colors.primary}
        onPress={() => handlePressAddButton(item)}>
        추가
      </Button>
    </View>
  </View>
)

const styles = StyleSheet.create({
  renderItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: MyTheme.width * 18,
    textAlign: 'left',
  },
})

export default RenderItem
