import React, { useState } from 'react'
import {
  TouchableOpacity,
  Modal,
  View,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'

import { Icon } from '@rneui/themed'

import { RootStackParamList } from '@_types/navigation'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export const ListManageIcon: React.FC = () => {
  const [showSettingsModal, setShowSettingsModal] = React.useState(false)
  const [modalStyle, setModalStyle] = useState({})
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  // 아이콘 위치에 따라 모달 위치 조정
  const handleIconLayout = (event: {
    nativeEvent: {
      layout: { x: number; y: number; width: number; height: number }
    }
  }) => {
    const { x, y, width, height } = event.nativeEvent.layout
    setModalStyle({
      position: 'absolute',
      right: x - width / 3,
      top: y,
    })
  }

  // 리스트 수정 버튼 클릭
  const handleEditButtonClick = () => {
    navigation.navigate('SelectEditList')
    setShowSettingsModal(false)
  }

  const handleAddButtonClick = () => {
    navigation.navigate('AddUserList')
    setShowSettingsModal(false)
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowSettingsModal(!showSettingsModal)}
        onLayout={handleIconLayout}
        style={styles.icon}>
        <Icon name="settings" size={30} color="black" testID="listManageIcon" />
      </TouchableOpacity>
      {showSettingsModal && (
        <Modal
          visible={showSettingsModal}
          onRequestClose={() => setShowSettingsModal(false)}
          transparent
          animationType="slide">
          <TouchableWithoutFeedback onPress={() => setShowSettingsModal(false)}>
            <View style={styles.container}>
              <TouchableWithoutFeedback>
                <View style={modalStyle}>
                  <Button
                    title="리스트 수정하기"
                    onPress={handleEditButtonClick}
                  />
                  <Button
                    title="리스트 추가하기"
                    onPress={handleAddButtonClick}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  icon: {
    left: deviceWidth * 0.3,
  },
})
