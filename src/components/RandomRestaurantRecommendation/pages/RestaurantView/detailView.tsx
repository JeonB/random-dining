import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import WebView from 'react-native-webview'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RestaurantParamList } from '@_types/restaurantParamList'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const DetailView = () => {
  const route = useRoute<RouteProp<RestaurantParamList, 'Detail'>>()
  return (
    <View style={styles.container}>
      {route.params?.url && (
        <WebView
          source={{ uri: route.params.url }}
          style={styles.webview}
          javaScriptEnabled={true}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
})

export default DetailView
