import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from '@rneui/themed'

import { RestaurantTypes } from '@_types/restaurant'

interface ItemProps {
  item: RestaurantTypes
  setListItems: Dispatch<SetStateAction<RestaurantTypes[]>>
}

export const RestaurantListItem: React.FC<ItemProps> = ({
  item,
  setListItems,
}) => {
  const filterItems = (items: RestaurantTypes[], itemToRemove: string) => {
    return items.filter(item => item.place_name !== itemToRemove)
  }
  const handlePressDeleteButton = () => {
    setListItems(prevItems => filterItems(prevItems, item.place_name))
  }

  return (
    <View style={styles.listItemContainer}>
      <Text>{item.place_name}</Text>
      <Icon
        name="delete"
        size={22}
        color="red"
        testID={`restaurantDeleteButton-${item.place_name}`}
        onPress={handlePressDeleteButton}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
