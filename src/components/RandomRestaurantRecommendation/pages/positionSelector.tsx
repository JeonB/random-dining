import { Button } from 'react-native-paper'
import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '@_types/navigation'

export const PositionSelector = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  // const handlePositionSelect = () => {
  //   navigation.navigate('Main')
  // }
  return (
    <View style={styles.mediaContainer} testID="mediaContainer">
      <Image
        source={{ uri: 'https://i.postimg.cc/rpJGytmg/image.png' }}
        style={{ width: '100%', height: '100%', marginBottom: 10 }}
      />
      <Button
        icon="map-marker"
        mode="contained"
        textColor="#272729"
        buttonColor="gainsboro"
        style={styles.button}
        onPress={() => navigation.navigate('CurrentPosition')}>
        내 위치에서 찾기
      </Button>
      <Button
        icon="map-search"
        mode="contained"
        textColor="#272729"
        buttonColor="gainsboro"
        style={styles.button}
        onPress={() => navigation.navigate('MapSearch')}>
        지도에서 찾기
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  mediaContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.7,
    position: 'relative',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  button: {
    marginTop: 10,
    width: '90%',
    borderRadius: 10,
    color: 'rgb(108, 109, 115)',
  },
})
