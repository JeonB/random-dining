import { StoryFn } from '@storybook/react'
import { LocationTypes } from './restaurant'

export interface RestaurantParamList {
  Detail: { url: string } | undefined
  MapSearch: { location: { [key: string]: number } } | undefined
  FilterSetting: { location: { [key: string]: number } } | undefined
  SelectedRestaurantInfo:
    | {
        restaurant: LocationTypes
        story?: StoryFn<any>
      }
    | undefined
  SelectedMenu: { items: string[] } | undefined
  RestaurantView: { restaurantItems: LocationTypes[] } | undefined
  [key: string]:
    | undefined
    | { url: string }
    | { restaurant: LocationTypes }
    | { restaurantItems: LocationTypes[] }
    | { location: { [key: string]: number } }
    | { items: string[] }
}
