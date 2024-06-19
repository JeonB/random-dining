import NetInfo from '@react-native-community/netinfo'
import { Alert } from 'react-native'

export const checkInternetConnection = async () => {
  const state = await NetInfo.fetch()
  if (!state.isConnected) {
    Alert.alert('', '인터넷 연결을 확인해주세요.', [{ text: '확인' }])
    return false
  }
  return true
}
