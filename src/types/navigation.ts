import { Restaurant } from './restaurant'

export interface RootStackParamList {
  Detail: { url: string }
  Main: { main: string } | undefined
  MapSearch: { mapSearch: string } | undefined
  CurrentPosition: { restaurantInfo: string[] } | undefined
  RestaurantInfo: { restaurant: Restaurant } | undefined
  SelectEditList: undefined
  AddUserList: undefined
  EditUserList: { listName: string }
  [key: string]:
    | undefined
    | { url: string }
    | { main: string }
    | { mapSearch: string }
    | { restaurantInfo: string[] }
    | { restaurant: Restaurant }
    | { listName: string } // 수정된 부분
}
