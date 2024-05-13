import React, { useEffect, useRef, useState } from 'react'
import {
  TouchableOpacity,
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { Icon } from '@rneui/themed'
import { Button } from 'react-native-paper'

import { RootStackParamList } from '@_types/navigation'
import { useSequentialAnimation } from '@_userList/hook/useSequentialAnimation'

export const ListManageIcon = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  const [showSettingsModal, setShowSettingsModal] = React.useState(false)

  const [modalStyle, setModalStyle] = useState({})
  const iconRef = React.createRef<TouchableOpacity>() // 아이콘 위치를 가져오기 위한 ref

  // 아이콘 위치에 따라 모달 위치 조정
  const handleIconClick = () => {
    iconRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const screenWidth = Dimensions.get('window').width
      const screenHeight = Dimensions.get('window').height
      setModalStyle({
        position: 'absolute',
        right: screenWidth - (pageX + width),
        bottom: screenHeight - pageY,
      })
    })
    setShowSettingsModal(!showSettingsModal)
  }

  // 아이콘 클릭시 회전 애니메이션
  const [direction, setDirection] = useState(0) // 아이콘 회전 방향

  const [editButtonOpacity, addButtonOpacity] =
    useSequentialAnimation(showSettingsModal) // 모달 표시 여부에 따라 순차적으로 애니메이션 실행 훅
  useEffect(() => {
    setDirection(showSettingsModal ? -1 : 1)
    rotateIcon()
  }, [showSettingsModal])
  const rotationAngle = useRef(new Animated.Value(0)).current // 회전 각도 관리
  const rotateIcon = () => {
    Animated.timing(rotationAngle, {
      toValue: direction * 0.2,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {})
  }
  // 아이콘 회전 각도 계산
  const rotateInterpolate = rotationAngle.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  // 리스트 수정 버튼 클릭
  const handleEditButtonClick = () => {
    navigation.navigate('SelectEditList')
    setShowSettingsModal(false)
  }

  // 리스트 추가 버튼 클릭
  const handleAddButtonClick = () => {
    navigation.navigate('AddUserList')
    setShowSettingsModal(false)
  }

  return (
    <>
      <TouchableOpacity
        onPress={handleIconClick}
        ref={iconRef}
        testID="listManageIcon">
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <Icon name="settings" size={35} color="black" />
        </Animated.View>
      </TouchableOpacity>
      {showSettingsModal && (
        <Modal
          visible={showSettingsModal}
          onRequestClose={() => setShowSettingsModal(false)}
          transparent
          animationType="fade"
          testID="ManageModal">
          <TouchableWithoutFeedback onPress={() => setShowSettingsModal(false)}>
            <View style={styles.container}>
              <TouchableWithoutFeedback>
                <View style={modalStyle}>
                  <Animated.View style={{ opacity: addButtonOpacity }}>
                    <Button
                      style={styles.button}
                      mode="contained"
                      onPress={handleAddButtonClick}>
                      리스트 추가하기
                    </Button>
                  </Animated.View>
                  <Animated.View style={{ opacity: editButtonOpacity }}>
                    <Button
                      style={styles.button}
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
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  button: {
    margin: 3,
    backgroundColor: '#2E6FCF',
    borderRadius: 10,
  },
})
