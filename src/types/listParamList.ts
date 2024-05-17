import { LocationTypes } from './restaurant'

export interface RootStackParamList {
  Detail: { url: string } | undefined
  UserSelectedRestaurantInfo: { restaurant: LocationTypes; listname: string }
  SelectEditList: undefined
  AddUserList: undefined
  EditUserList: { listName: string }
  [key: string]:
    | undefined
    | { url: string }
    | { listName: string }
    | { restaurant: LocationTypes }
}
