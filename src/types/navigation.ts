import { RestaurantTypes } from './restaurant'

export interface RootStackParamList {
  Detail: { url: string } | undefined
  Main: { main: string } | undefined
  SelectEditList: undefined
  AddUserList: undefined
  EditUserList: { listName: string }
  [key: string]:
    | undefined
    | { url: string }
    | { main: string }
    | { listName: string }
}
