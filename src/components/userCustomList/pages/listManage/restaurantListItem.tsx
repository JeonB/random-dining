import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from '@rneui/themed'
import { LocationTypes } from '@_types'

interface ItemProps {
  item: LocationTypes
  setListItems: Dispatch<SetStateAction<LocationTypes[]>>
}

export const RestaurantListItem: React.FC<ItemProps> = ({
  item,
  setListItems,
}) => {
  const filterItems = (items: LocationTypes[], itemToRemove: string) => {
    return items.filter(item => item.place_name !== itemToRemove)
  }
  const handlePressDeleteButton = () => {
    setListItems(prevItems => filterItems(prevItems, item.place_name))
  }

  return (
    <View style={styles.listItemContainer}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {item.place_name}
        </Text>
      </View>
      <Icon
        name="delete"
        size={22}
        color="#FF3A54"
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
  textContainer: {
    flex: 1,
  },
})
