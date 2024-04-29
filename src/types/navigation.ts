import { Restaurant } from './restaurant'

export interface RootStackParamList {
  Detail: { url: string }
  Main: { main: string } | undefined
  MapSearch: { mapSearch: string } | undefined
  CurrentPosition: { restaurantInfo: string[] } | undefined
  RestaurantInfo: { restaurant: Restaurant } | undefined // 수정된 부분
  [key: string]:
    | undefined
    | { url: string }
    | { main: string }
    | { mapSearch: string }
    | { restaurantInfo: string[] }
    | { restaurant: Restaurant } // 수정된 부분
}
