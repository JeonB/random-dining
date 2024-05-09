import { StoryFn } from '@storybook/react'
import { LocationTypes } from './restaurant'

export interface RestaurantParamList {
  Detail: { url: string } | undefined
  MapSearch: { mapSearch: string } | undefined
  FilterSetting: { location: { [key: string]: number } } | undefined
  SelectedRestaurantInfo:
    | {
        restaurant: LocationTypes
        story?: StoryFn<any>
      }
    | undefined

  [key: string]:
    | undefined
    | { url: string }
    | { mapSearch: string }
    | { restaurant: LocationTypes }
    | { location: { [key: string]: number } }
}
