import React from 'react'
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native'
import { Icon } from '@rneui/themed'
import { MyTheme } from 'theme'

interface KebapMenuModalProps {
  modalVisible: boolean
  modalPosition: { x: number; y: number }
  selectedItem: string
  onEdit: (item: string) => void
  onDelete: (item: string) => void
  onClose: () => void
}

export const KebapMenuModal: React.FC<KebapMenuModalProps> = ({
  modalVisible,
  modalPosition,
  selectedItem,
  onEdit,
  onDelete,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalView}>
          <View
            style={[
              styles.modalContent,
              {
                top: modalPosition.y,
                left: modalPosition.x,
              },
            ]}>
            <TouchableOpacity onPress={() => onEdit(selectedItem)}>
              <View
                style={[
                  styles.button,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                  },
                ]}>
                <Icon
                  type="material-community"
                  size={25}
                  name={'playlist-edit'}
                />
                <Text style={[styles.modalText]}>수정</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(selectedItem)}>
              <View style={[styles.button, { paddingLeft: 7 }]}>
                <Icon
                  type="material-community"
                  size={25}
                  name={'delete-outline'}
                  color={'red'}
                />
                <Text style={[styles.modalText, { color: 'red' }]}>삭제</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: 'rgba(230, 230, 230, 0.95)',
    borderRadius: 5,
    width: 100,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  modalText: {
    textAlign: 'center',
    fontSize: Platform.select({
      ios: MyTheme.width * 17,
      android: MyTheme.width * 16,
    }),
    marginVertical: Platform.select({
      ios: MyTheme.width * 10,
      android: MyTheme.width * 7,
    }),
  },
})
