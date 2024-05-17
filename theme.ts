import { DefaultTheme } from '@react-navigation/native'

// 메인 테마 설정
export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3BB54B',
    background: '#fff',
  },
}
