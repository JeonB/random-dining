import React from 'react'
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from 'react-native'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'

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
              <Animated.View style={{ opacity: addButtonOpacity }}>
                <Button
                  style={styles.button}
                  buttonColor={MyTheme.colors.primary}
                  mode="contained"
                  onPress={handleAddButtonClick}>
                  리스트 추가하기
                </Button>
              </Animated.View>
              <Animated.View style={{ opacity: editButtonOpacity }}>
                <Button
                  style={styles.button}
                  buttonColor={MyTheme.colors.primary}
                  mode="contained"
                  onPress={handleEditButtonClick}>
                  리스트 수정하기
                </Button>
              </Animated.View>
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
  button: {
    margin: 3,
    borderRadius: 10,
  },
})
