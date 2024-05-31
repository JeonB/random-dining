import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { MyTheme } from 'theme'
import { useHideTabBar } from '@_components/useHideTabBar'
import { RootStackParamList } from '@_types/listParamList'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import { useListNames } from '@_userList/hook/useListNames'

export const SelectEditList = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  useHideTabBar()

  const { listNames } = useListNames()

  const handlePressItem = async (item: string) => {
    try {
      navigation.navigate('EditUserList', { listName: item })
    } catch (error) {
      console.error('Error :', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoArea}>
        <Text style={styles.infoText}>수정 할 리스트를 선택해주세요.</Text>
      </View>
      <DefaultFlatList
        data={listNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <Text style={styles.listText} numberOfLines={1} ellipsizeMode="tail">
            {item}
          </Text>
        )}
        onPressItem={handlePressItem}
      />
    </View>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MyTheme.width * 30,
    paddingVertical: MyTheme.width * 15,
  },
  listText: {
    fontSize: MyTheme.width * 20,
    textAlign: 'center',
    lineHeight: MyTheme.width * 24,
  },
  infoArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: MyTheme.width * 10,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: MyTheme.colors.secondary,
  },
  infoText: {
    color: 'white',
    fontSize: MyTheme.width * 20,
    lineHeight: MyTheme.width * 24,
    paddingTop: MyTheme.width,
  },
})
