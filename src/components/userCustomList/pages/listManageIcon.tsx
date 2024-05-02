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
import { useSequentialAnimation } from '@_components/userCustomList/hook/useSequentialAnimation'

const { width, height } = Dimensions.get('window')

export const ListManageIcon = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  const [showSettingsModal, setShowSettingsModal] = React.useState(false)
  const [modalStyle, setModalStyle] = useState({})

  // 아이콘 회전 방향
  const [direction, setDirection] = useState(0)

  const [editButtonOpacity, addButtonOpacity] =
    useSequentialAnimation(showSettingsModal)

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
  useEffect(() => {
    setDirection(showSettingsModal ? -1 : 1)
    rotateIcon()
  }, [showSettingsModal])

  const handleIconClick = () => {
    setShowSettingsModal(!showSettingsModal)
  }

  const rotationAngle = useRef(new Animated.Value(0)).current

  const rotateIcon = () => {
    Animated.timing(rotationAngle, {
      toValue: direction * 0.2,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {})
  }

  const rotateInterpolate = rotationAngle.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <>
      <TouchableOpacity
        onPress={handleIconClick}
        onLayout={handleIconLayout}
        style={styles.icon}>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <Icon
            name="settings"
            size={30}
            color="black"
            testID="listManageIcon"
          />
        </Animated.View>
      </TouchableOpacity>
      {showSettingsModal && (
        <Modal
          visible={showSettingsModal}
          onRequestClose={() => setShowSettingsModal(false)}
          transparent
          animationType="fade">
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
  icon: {
    left: width * 0.3,
  },
  button: {
    margin: 3,
    backgroundColor: '#2E6FCF',
    borderRadius: 10,
  },
})
