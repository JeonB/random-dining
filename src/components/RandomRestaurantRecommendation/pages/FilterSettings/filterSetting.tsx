import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'
import { DistanceSlider } from './distanceSlider'
import { CategorySwitch } from './categorySwitch'
import { Button } from 'react-native-paper'
import { RandomItemModal } from '../randomItemModal'

const FilterSetting = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const handleModal = () => {
    // ;<RandomItemModal
    //   visible={modalVisible}
    //   onClose={() => setModalVisible(false)}
    // />
  }
  return (
    <View style={styles.container}>
      <View style={styles.filterOptions}>
        <Text h3 h3Style={styles.text}>
          거리
        </Text>
        <DistanceSlider />
      </View>
      <View style={styles.filterOptions}>
        <Text h3 h3Style={styles.text}>
          카테고리
        </Text>
        <CategorySwitch />
      </View>
      <View style={{ margin: 20 }}>
        <Button
          labelStyle={{ fontSize: 20 }}
          mode="elevated"
          textColor="#272729"
          icon="chat-question-outline"
          buttonColor="lightskyblue"
          onPress={() => {}}
          contentStyle={{ flexDirection: 'row-reverse' }}>
          뭐 먹지?
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  filterOptions: { marginTop: 20 },
  text: { textAlign: 'left', alignSelf: 'flex-start', margin: 20 },
})

export default FilterSetting
