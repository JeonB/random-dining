import { DefaultTheme } from '@react-navigation/native'
import { Dimensions } from 'react-native'
// 메인 테마 설정
const REFERENCE_WIDTH = 365
export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3BB54B',
    secondary: '#FF7F50',
    background: '#fff',
  },
  width: Dimensions.get('screen').width / REFERENCE_WIDTH,
}
