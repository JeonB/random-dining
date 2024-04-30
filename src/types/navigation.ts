export interface RootStackParamList {
  Detail: { url: string }
  SelectEditList: undefined
  AddUserList: undefined
  EditUserList: { listName: string }
  [key: string]: undefined | { url: string } | { listName: string }
}
