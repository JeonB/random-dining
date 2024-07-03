import { Modal, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { AnimatedRandomSelector } from '@_common/ui/animatedRandomSelector'
import React from 'react'
import { LocationTypes } from 'src/types'

interface RandomPickerModalProps {
  visible: boolean
  items: string[] | LocationTypes[]
  onClose: () => void
  onItemChange?: () => void
  isRestaurantSelection?: boolean
}

const RandomItemModal = ({
  visible,
  onClose,
  onItemChange,
  items,
  isRestaurantSelection,
}: RandomPickerModalProps) => {
  return (
    <Modal style={styles.modal} visible={visible} onRequestClose={onClose}>
      <View style={styles.modal}>
        <AnimatedRandomSelector
          itemHeight={36}
          items={items}
          onItemChange={onItemChange}
          closeModal={onClose}
          isRestaurantSelection={isRestaurantSelection}
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
