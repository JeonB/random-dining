import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity,
} from 'react-native'
import { Icon } from '@rneui/themed'

export const Support = () => {
  const handlePressCall = () => {
    const phoneNumber = 'tel:02-6383-3101'
    Linking.openURL(phoneNumber)
  }
  const handlePressWebsite = () => {
    Linking.openURL('https://www.ifinfo.co.kr')
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.item}>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              style={{ marginLeft: 10 }}
              name="email"
              size={35}
              color="orange"
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.textContent}>ifinfo2@ifinfo.co.kr</Text>
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              style={{ marginLeft: 10 }}
              name="call"
              size={35}
              color="green"
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>Tel</Text>
              <TouchableOpacity onPress={handlePressCall}>
                <Text style={styles.textContent}>02-6383-3101</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.finalItem}>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              style={{ marginLeft: 10 }}
              name="web"
              size={35}
              color="blue"
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>Website</Text>
              <TouchableOpacity onPress={handlePressWebsite}>
                <Text style={styles.textContent}>www.ifinfo.co.kr</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  box: {
    width: width * 0.9,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  textContent: {
    fontSize: 17,
    color: '#337AB7',
    marginBottom: 5,
    marginLeft: 10,
  },
  item: {
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  finalItem: {
    marginBottom: 10,
    paddingTop: 10,
  },
})
