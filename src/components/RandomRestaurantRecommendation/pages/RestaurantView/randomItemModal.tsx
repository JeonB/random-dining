import { Modal, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { AnimatedRandomSelector } from '@_3Rpages/RestaurantView/animatedRandomSelector'
import { LocationTypes } from '@_types/restaurant'
import React, { memo } from 'react'
import InlineAd from '../inlinedAd'

interface RandomPickerModalProps {
  visible: boolean
  restaurantItems: LocationTypes[]
  onClose: () => void
  onRestaurantIndexChange: (index: number) => void
}

const RandomItemModal = memo(
  ({
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
          <View style={styles.inlineAd}>
            <InlineAd />
          </View>
        </View>
      </Modal>
    )
  },
)

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
RandomItemModal.displayName = 'RandomItemModal'
export default memo(RandomItemModal)
