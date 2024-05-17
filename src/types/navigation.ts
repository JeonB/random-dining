import { LocationTypes } from './restaurant'

export interface RootStackParamList {
  Main: { main: string } | undefined
  UserSelectedRestaurantInfo: { restaurant: RestaurantTypes; listname: string }
  SelectEditList: undefined
  AddUserList: undefined
  EditUserList: { listName: string }
  [key: string]: undefined | { main: string } | { listName: string }
}
