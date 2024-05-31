import React from 'react'
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from 'react-native'
import { ListManageButton } from '@_userListPages/listManage/listManageButton'

export const ListManageModal = ({
  visible,
  onRequestClose,
  handleAddButtonClick,
  handleEditButtonClick,
  addButtonOpacity,
  editButtonOpacity,
  modalStyle,
}: {
  visible: boolean
  onRequestClose: () => void
  handleAddButtonClick: () => void
  handleEditButtonClick: () => void
  addButtonOpacity: Animated.Value
  editButtonOpacity: Animated.Value
  modalStyle: object
}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent
      animationType="fade"
      testID="ManageModal">
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={modalStyle}>
              <ListManageButton
                opacity={addButtonOpacity}
                onPress={handleAddButtonClick}
                title="리스트 추가하기"
              />
              <ListManageButton
                opacity={editButtonOpacity}
                onPress={handleEditButtonClick}
                title="리스트 수정하기"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
})
