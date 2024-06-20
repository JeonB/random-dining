import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '@rneui/themed'
import { MyTheme } from 'theme'

const CATEGORY = [
  '전체',
  '한식',
  '일식',
  '중식',
  '양식',
  '분식',
  '아시아음식',
  '야식',
]

const getImageByCategory = (category: string) => {
  const images: { [key: string]: any } = {
    전체: require('@_assetImages/category/all.png'),
    한식: require('@_assetImages/category/korean.png'),
    일식: require('@_assetImages/category/japanese.png'),
    중식: require('@_assetImages/category/chinese.png'),
    양식: require('@_assetImages/category/western.png'),
    분식: require('@_assetImages/category/street.png'),
    아시아음식: require('@_assetImages/category/asian.png'),
    야식: require('@_assetImages/category/lns.png'),
  }
  return images[category]
}

const CategorySwitch = ({
  onCategoryChange = () => {},
}: {
  onCategoryChange?: (categories: string[]) => void
}) => {
  const [activatedCategory, setActivatedCategory] = useState<string[]>(['전체'])

  const handleToggle = (category: string) => {
    if (category === '전체') {
      setActivatedCategory(['전체'])
    } else {
      setActivatedCategory(prev => {
        let updated
        if (prev.includes('전체')) {
          updated = [category]
        } else if (prev.includes(category)) {
          updated = prev.filter(c => c !== category)
        } else {
          updated = [...prev, category]
        }

        if (updated.length === CATEGORY.length - 1) {
          return ['전체']
        }

        return updated.length === 0 ? ['전체'] : updated
      })
    }
  }

  useEffect(() => {
    onCategoryChange(
      activatedCategory.includes('전체')
        ? CATEGORY.slice(1)
        : activatedCategory,
    )
  }, [activatedCategory, onCategoryChange])

  return (
    <View style={styles.container}>
      {CATEGORY.map(category => (
        <View key={category} style={styles.categoryContainer}>
          <TouchableOpacity onPress={() => handleToggle(category)}>
            <View style={styles.imageContainer}>
              <Image
                source={getImageByCategory(category)}
                style={
                  activatedCategory.includes(category)
                    ? styles.inactiveImage
                    : {}
                }
              />
              {activatedCategory.includes(category) && (
                <Image
                  source={require('@_assetImages/category/selected.png')}
                  style={styles.selectedOverlay}
                />
              )}
            </View>
            <Text style={styles.text}>{category}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: MyTheme.width * 15,
  },
  categoryContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveImage: {
    opacity: 0.3,
  },
  selectedOverlay: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  text: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: MyTheme.width * 16,
    textAlign: 'center',
  },
})

export default CategorySwitch
