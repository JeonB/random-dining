import React from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { MyTheme } from 'theme'

export interface FlatListProps<T> {
  data: T[]
  keyExtractor: (item: T, index: number) => string
  renderItem: (item: T) => JSX.Element
  onPressItem?: (item: T) => void
}

const RenderItem = <T,>({
  item,
  renderItem,
  onPressItem,
  itemStyle,
}: {
  item: T
  renderItem: (item: T) => JSX.Element
  onPressItem?: (item: T) => void
  itemStyle?: StyleProp<ViewStyle>
}) => (
  <TouchableOpacity
    style={[styles.item, itemStyle]}
    onPress={() => onPressItem?.(item)}>
    {renderItem(item)}
  </TouchableOpacity>
)

interface DefaultFlatListProps<T> extends FlatListProps<T> {
  itemStyle?: StyleProp<ViewStyle>
}

export const DefaultFlatList = <T,>({
  data,
  keyExtractor,
  renderItem,
  onPressItem,
  itemStyle,
}: DefaultFlatListProps<T>) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <RenderItem<T>
            item={item}
            renderItem={renderItem}
            onPressItem={onPressItem}
            itemStyle={itemStyle}
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
    borderColor: MyTheme.colors.primary,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 5,
  },
})
