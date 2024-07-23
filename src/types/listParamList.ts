import { LocationTypes } from './location'

export interface RootStackParamList {
  Detail: { url: string } | undefined
  UserSelectedRestaurantInfo: {
    listname: string
    restaurantList: LocationTypes[]
  }
  SelectEditList: undefined
  AddUserList: undefined
  EditUserList: { listName: string }
  [key: string]:
    | undefined
    | { url: string }
    | { listName: string }
    | { restaurant: LocationTypes }
    | {
        listname: string
        restaurantList: LocationTypes[]
      }
}
