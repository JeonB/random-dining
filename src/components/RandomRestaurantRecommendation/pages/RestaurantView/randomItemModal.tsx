import { Modal, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { AnimatedRandomSelector } from '@_common/ui/animatedRandomSelector'
import { LocationTypes } from '@_types'
import React from 'react'

interface RandomPickerModalProps {
  visible: boolean
  restaurantItems: LocationTypes[]
  onClose: () => void
  onRestaurantIndexChange: (index: number) => void
}

const RandomItemModal = ({
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
  inlineAd: {
    position: 'absolute',
    bottom: 5,
  },
})
export default RandomItemModal
