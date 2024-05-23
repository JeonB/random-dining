import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Platform } from 'react-native'
import { Switch } from 'react-native-switch'
import { MyTheme } from 'theme'
const ToggleSwitch = ({
  onToggle,
  initialState = false,
}: {
  onToggle?: (newState: boolean) => void
  initialState?: boolean
}) => {
  const [isEnabled, setIsEnabled] = useState(initialState)
  const toggleSwitch = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    if (onToggle) {
      onToggle(newState)
    }
  }
  return (
    <View style={styles.container}>
      <Switch
        value={isEnabled}
        onValueChange={toggleSwitch}
        disabled={false}
        circleSize={30}
        barHeight={30}
        circleBorderWidth={2}
        backgroundActive={MyTheme.colors.primary}
        backgroundInactive={'#767577'}
        circleActiveColor={MyTheme.colors.background}
        circleInActiveColor={'#f4f3f4'}
        renderActiveText={false}
        renderInActiveText={false}
        switchWidthMultiplier={1.8}
        switchLeftPx={2}
        switchRightPx={2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default ToggleSwitch
