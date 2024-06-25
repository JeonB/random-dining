import React, { useRef, useState, useEffect } from 'react'
import {
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
  Platform,
} from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { Icon } from '@rneui/themed'
import { RootStackParamList } from '@_types'
import { useSequentialAnimation } from '@_userList/hook/useSequentialAnimation'
import { useListNames } from '@_userList/hook/useListNames'
import { ListManageModal } from '@_userListPages/listManage/listManageModal'

export const ListManageIcon = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [modalStyle, setModalStyle] = useState({})
  const iconRef = useRef<TouchableOpacity>(null)
  const { listNames, fetchListNames } = useListNames()
  const [direction, setDirection] = useState(0)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const handleIconClick = () => {
    iconRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const screenWidth = Dimensions.get('window').width
      const screenHeight = Dimensions.get('window').height

      setModalStyle({
        position: 'absolute',
        right: screenWidth - (pageX + width),
        bottom: Platform.OS === 'android' ? 120 : screenHeight - pageY,
      })
      fetchListNames()
      setShowSettingsModal(prev => !prev)
    })
  }

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }
    setDirection(showSettingsModal ? 1 : -1)
  }, [showSettingsModal])

  const [editButtonOpacity, addButtonOpacity] =
    useSequentialAnimation(showSettingsModal)

  const rotationAngle = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isFirstRender) return
    Animated.timing(rotationAngle, {
      toValue: direction * 0.2,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [direction, isFirstRender])

  const rotateInterpolate = rotationAngle.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const handleEditButtonClick = () => {
    if (listNames.length === 0) {
      Alert.alert('저장된 리스트가 없습니다.')
    } else {
      navigation.navigate('SelectEditList')
    }
    setShowSettingsModal(false)
  }

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
          <Icon name="settings" size={40} color="black" />
        </Animated.View>
      </TouchableOpacity>
      <ListManageModal
        visible={showSettingsModal}
        onRequestClose={() => setShowSettingsModal(false)}
        handleAddButtonClick={handleAddButtonClick}
        handleEditButtonClick={handleEditButtonClick}
        addButtonOpacity={addButtonOpacity}
        editButtonOpacity={editButtonOpacity}
        modalStyle={modalStyle}
      />
    </>
  )
}
