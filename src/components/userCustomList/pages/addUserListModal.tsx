import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'
import { useListNames } from '@_components/userCustomList/hook/useListNames'
import { CreateNewListModal } from '@_userListPages/createNewListModal'
import { LocationTypes } from '@_types/restaurant'
import { useFocusEffect } from '@react-navigation/native'

export const AddUserListModal = ({
  selectedInfo,
  visible,
  onClose,
}: {
  selectedInfo: LocationTypes
  visible: boolean
  onClose: () => void
}) => {
  const { listNames, saveListNames, fetchListNames } = useListNames()
  const [newListModalVisible, setNewListModalVisible] = useState(false)
  const [newListName, setNewListName] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      fetchListNames()
    }, []),
  )
  const addToList = async (listName: string) => {
    const savedList = await AsyncStorage.getItem(listName)
    const list = savedList ? JSON.parse(savedList) : []

    if (
      !list.some(
        (item: { place_name: string }) =>
          item?.place_name === selectedInfo.place_name,
      )
    ) {
      list.push(selectedInfo)
      await AsyncStorage.setItem(listName, JSON.stringify(list))
      Alert.alert(
        `"${selectedInfo.place_name}" 추가`,
        `"${listName}"에 추가되었습니다.`,
      )
      onClose()
    } else {
      Alert.alert(
        `"${selectedInfo.place_name}" 추가`,
        `"${listName}"에 "${selectedInfo.place_name}"이/가 이미 있습니다.`,
      )
    }
  }

  const createNewList = async () => {
    if (newListName.trim()) {
      listNames.push(newListName)
      await saveListNames(listNames)
      await AsyncStorage.setItem(newListName, JSON.stringify([selectedInfo]))
      Alert.alert('리스트 생성 완료', `"${newListName}"에 추가됐습니다.`)
      setNewListName('')
      setNewListModalVisible(false)
      onClose()
    } else {
      Alert.alert(
        '리스트 이름은 비워둘 수 없습니다.',
        '리스트 이름을 입력해주세요.',
      )
    }
  }

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>리스트에 추가</Text>
            <Text style={styles.subTitle}>어느 리스트에 추가하시겠습니까?</Text>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={listNames}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItemContainer}
                  onPress={() => addToList(item)}>
                  <Text
                    style={styles.listItem}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <Button
            textColor={MyTheme.colors.primary}
            labelStyle={styles.newListButtonLabel}
            onPress={() => setNewListModalVisible(true)}>
            + 새로운 리스트 만들기
          </Button>
          <Button
            textColor="gray"
            labelStyle={styles.cancelButtonLabel}
            onPress={onClose}>
            취소
          </Button>
        </View>
      </View>
      <CreateNewListModal
        visible={newListModalVisible}
        newListName={newListName}
        setNewListName={setNewListName}
        createNewList={createNewList}
        onClose={() => setNewListModalVisible(false)}
      />
    </Modal>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    position: 'absolute',
    top: height * 0.2,
    width: width * 0.8,
    margin: 20,
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    borderRadius: 10,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  listContainer: {
    borderTopWidth: 0.2,
    borderColor: 'gray',
    maxHeight: height * 0.3,
    marginBottom: 10,
  },
  listItemContainer: {
    borderBottomWidth: 0.2,
    borderColor: 'gray',
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  newListButtonLabel: {
    fontSize: 18,
  },
  cancelButtonLabel: {
    fontSize: 16,
  },
})
