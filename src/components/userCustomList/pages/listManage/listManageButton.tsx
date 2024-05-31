import React from 'react'
import { Animated } from 'react-native'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'

export const ListManageButton = React.memo(
  ({
    opacity,
    onPress,
    title,
  }: {
    opacity: Animated.Value | number
    onPress: () => void
    title: string
  }) => {
    return (
      <Animated.View style={{ opacity }}>
        <Button
          style={styles.button}
          buttonColor={MyTheme.colors.primary}
          mode="contained"
          onPress={onPress}>
          {title}
        </Button>
      </Animated.View>
    )
  },
)

ListManageButton.displayName = 'AnimatedButton'

const styles = {
  button: {
    margin: 3,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 1,
  },
}
