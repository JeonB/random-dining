import { Modal, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { AnimatedRandomSelector } from './animatedRandomSelector'
import { Restaurant } from '@_types/restaurant'
import React from 'react'

interface RandomPickerModalProps {
  visible: boolean
  info: Restaurant[]
  onClose: () => void
  onIndexChange: (index: number) => void
}

export const RandomItemModal: React.FC<RandomPickerModalProps> = ({
  visible,
  onClose,
  onIndexChange,
  info,
}) => {
  return (
    <Modal style={styles.modal} visible={visible} onRequestClose={onClose}>
      <View style={styles.modal}>
        <AnimatedRandomSelector
          itemHeight={36}
          restaurantItems={info}
          onIndexChange={onIndexChange}
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
