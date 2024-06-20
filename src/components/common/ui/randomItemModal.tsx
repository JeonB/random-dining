import { Modal, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { AnimatedRandomSelector } from '@_common/ui/animatedRandomSelector'
import React from 'react'

interface RandomPickerModalProps {
  visible: boolean
  items: string[]
  onClose: () => void
  onItemChange?: () => void
}

const RandomItemModal = ({
  visible,
  onClose,
  onItemChange,
  items,
}: RandomPickerModalProps) => {
  return (
    <Modal style={styles.modal} visible={visible} onRequestClose={onClose}>
      <View style={styles.modal}>
        <AnimatedRandomSelector
          itemHeight={36}
          items={items}
          onItemChange={onItemChange}
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
