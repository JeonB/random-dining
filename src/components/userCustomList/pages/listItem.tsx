import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import { Icon } from '@rneui/themed'
import { MyTheme } from 'theme'

interface ListItemProps {
  item: string
  onKebabPress: (width: number, height: number, x: number, y: number) => void
  onItemPress: () => void
}

export const ListItem: React.FC<ListItemProps> = ({
  item,
  onKebabPress,
  onItemPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemContainer} onPress={onItemPress}>
        <Text style={styles.listText} numberOfLines={1} ellipsizeMode="tail">
          {item}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.kebabButton}
        onPress={event => {
          event.currentTarget.measure((fx, fy, width, height, px, py) => {
            onKebabPress(width, height, px, py)
          })
        }}>
        <Icon type="material-community" size={25} name={'dots-vertical'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {
    width: '85%',
  },
  listText: {
    fontSize: MyTheme.width * 20,
    lineHeight: MyTheme.width * 24,
  },
  kebabButton: {
    width: '15%',
    alignItems: 'flex-end',
  },
})
