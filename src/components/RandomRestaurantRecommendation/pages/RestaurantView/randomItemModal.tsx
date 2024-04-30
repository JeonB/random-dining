import { Modal, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { AnimatedRandomSelector } from './animatedRandomSelector'
import { Restaurant } from '@_types/restaurant'
import React from 'react'

interface RandomPickerModalProps {
  visible: boolean
  restaurantItems: Restaurant[]
  onClose: () => void
  onRestaurantIndexChange: (index: number) => void
}

export const RandomItemModal = ({
  visible,
  onClose,
  onRestaurantIndexChange,
  restaurantItems,
}: RandomPickerModalProps) => {
  return (
    <Modal style={styles.modal} visible={visible} onRequestClose={onClose}>
      <View style={styles.modal}>
        <AnimatedRandomSelector
          itemHeight={36}
          restaurantItems={restaurantItems}
          onIndexChange={onRestaurantIndexChange}
          closeModal={onClose}
        />
        <Button onPress={onClose}>Close</Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
