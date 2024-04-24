import React from 'react'
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

export interface FlatListProps {
  data: string[]
  keyExtractor: (item: string, index: number) => string
  renderItem: (item: string) => JSX.Element
  onPressItem?: (item: string) => void
}

const RenderItem: React.FC<{
  item: string
  renderItem: (item: string) => JSX.Element
  onPressItem?: (item: string) => void
}> = ({ item, renderItem, onPressItem }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={onPressItem ? () => onPressItem(item) : undefined}>
    {renderItem(item)}
  </TouchableOpacity>
)

export const DefaultFlatList: React.FC<FlatListProps> = ({
  data,
  keyExtractor,
  renderItem,
  onPressItem,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            renderItem={renderItem}
            onPressItem={onPressItem}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.2,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 5,
  },
})
