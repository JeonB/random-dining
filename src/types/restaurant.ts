// 식당 추가시 데이터를 다 넘겨주지 않아도 되도록 테스트
export interface LocationTypes {
  id?: number
  place_name: string
  category_name?: string
  distance?: string
  phone?: string
  place_url?: string
  created_at?: string
  updated_at?: string
  x?: string
  y?: string
}

// export interface Restaurant {
//   id: number
//   place_name: string
//   category_name: string
//   distance: string
//   phone: string
//   place_url: string
//   created_at: string
//   updated_at: string
//   x: string
//   y: string
// }
