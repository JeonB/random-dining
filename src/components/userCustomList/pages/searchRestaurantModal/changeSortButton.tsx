import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface ChangeSortButtonProps {
  handlePress: () => void
  sort: string
}

export const ChangeSortButton: React.FC<ChangeSortButtonProps> = ({
  handlePress,
  sort,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        style={styles.buttonContainer}
        testID="sortButton">
        <Text style={{ fontSize: 16 }}>
          {sort === 'distance' ? '거리순' : '정확도순'}
        </Text>
        <MaterialIcons name="swap-vert" size={16} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 7,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
