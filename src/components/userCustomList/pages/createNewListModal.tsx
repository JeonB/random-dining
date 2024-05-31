import React from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { Button } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import { MyTheme } from 'theme'

export const CreateNewListModal = ({
  visible,
  newListName,
  setNewListName,
  createNewList,
  onClose,
}: {
  visible: boolean
  newListName: string
  setNewListName: (name: string) => void
  createNewList: () => void
  onClose: () => void
}) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>리스트 생성</Text>
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              placeholder="리스트 이름을 입력하세요."
              value={newListName}
              onChangeText={setNewListName}
              autoFocus={true}
              clearButtonMode="always"
            />
            {Platform.OS === 'android' && newListName ? (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 15,
                }}
                onPress={() => setNewListName('')}>
                <Feather name="x" size={15} color="black" />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.buttonContainer}>
            <Button textColor="gray" onPress={onClose} style={styles.button}>
              취소
            </Button>
            <Button
              textColor={MyTheme.colors.primary}
              onPress={createNewList}
              style={styles.button}>
              추가
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    width: MyTheme.width * 290,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: MyTheme.width * 15,
  },
  title: {
    textAlign: 'center',
    fontSize: MyTheme.width * 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputArea: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '50%',
  },
})
