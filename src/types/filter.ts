export interface FilterData {
  label: string
  value: string
}

export interface FiltersProps {
  categoryItems: FilterData[]
  onValueChange?: (selectedValues: string[]) => void
}

export interface FilterButtonProps {
  onPress: () => void
  text: string
  isSelected: boolean
}
