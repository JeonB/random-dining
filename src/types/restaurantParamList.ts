import { StoryFn } from '@storybook/react'
import { RestaurantTypes } from './restaurant'

export interface RestaurantParamList {
  MapSearch: { mapSearch: string } | undefined
  FilterSetting: { location: { [key: string]: number } } | undefined
  SelectedRestaurantInfo:
    | {
        restaurant: RestaurantTypes
        location: { [key: string]: number }
        story?: StoryFn<any>
      }
    | undefined

  [key: string]:
    | undefined
    | { mapSearch: string }
    | { restaurant: RestaurantTypes }
    | { location: { [key: string]: number } }
}
