import React, { useEffect, useState } from 'react'
import ToggleSwitch from '@_components/common/toggleSwitch'
import { StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'

const CATEGORY = [
  'ALL',
  '한식',
  '일식',
  '중식',
  '양식',
  '분식',
  '아시아음식',
  '제육볶음',
]

const CategorySwitch = ({
  onCategoryChange = () => {},
}: {
  onCategoryChange?: (categories: string[]) => void
}) => {
  const [isAll, setIsAll] = useState(true)
  const [activatedCategory, setActivatedCategory] = useState<string[]>(
    CATEGORY.slice(1),
  )

  const categoriesToShow = isAll ? [CATEGORY[0]] : CATEGORY

  const updateCategories = (category: string, isActive: boolean) => {
    if (isActive) {
      setActivatedCategory(prev => [...prev, category])
    } else {
      setActivatedCategory(prev => prev.filter(c => c !== category))
    }
  }

  const handleToggle = (category: string, isActive: boolean) => {
    if (category === 'ALL') {
      setIsAll(isActive)
      setActivatedCategory(isActive ? CATEGORY.slice(1) : [])
    } else {
      updateCategories(category, isActive)
    }
  }

  useEffect(() => {
    onCategoryChange(activatedCategory)
  }, [activatedCategory, onCategoryChange])

  return (
    <View>
      {categoriesToShow.map(category => (
        <View
          key={category}
          style={{ flexDirection: 'column', marginBottom: 3 }}>
          <View style={styles.container}>
            <Text h4 h4Style={{ alignSelf: 'center', paddingLeft: 10 }}>
              {category}
            </Text>
            <ToggleSwitch
              initialState={category === 'ALL'}
              onToggle={(isActive: boolean) => handleToggle(category, isActive)}
            />
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    backgroundColor: 'gainsboro',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
  },
})

export default CategorySwitch
