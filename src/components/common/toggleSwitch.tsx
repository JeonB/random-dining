import React, { useState } from 'react'
import { View, Switch, StyleSheet } from 'react-native'

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
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#e6e6fA' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default ToggleSwitch
