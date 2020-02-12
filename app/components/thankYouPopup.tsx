import React, { FC } from 'react'
import { TouchableOpacity, View, StyleSheet } from "react-native"
import { SCREEN_HEIGHT } from "../constants/constants"
import { Icon } from "./icon/icon"
import { Text } from "./text/text"
import { palette } from "../theme/palette"
import { color } from "../theme"

export interface PopupProps {
  onPress: () => void
}
export const ThankYouPopup: FC<PopupProps> = (props) => {
  const { onPress } = props
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.topSection}>
          <Icon style={{ marginBottom: 28 }} icon="loginLogo" />
          <Text preset={'bold'} style={styles.thanksText}>
            {'תודה שהקדשת מזמנך'}
          </Text>
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => onPress && onPress()}
          >
            <Text preset={'bold'} style={styles.buttonText}>
              {'סגירה'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomSection: {
    alignItems: 'center',
    borderColor: color.textFieldBorder,
    borderTopWidth: 1,
    height: 72,
    justifyContent: 'center'
  },
  buttonText: {
    color: palette.darkBlue,
    fontSize: 16
  },
  closeButton: {
    alignItems: 'center',
    borderColor: color.textFieldBorder,
    borderRadius: 4,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    width: 124
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // @ts-ignore
    ...StyleSheet.absoluteFill,
    backgroundColor: palette.popUpBg,
    zIndex: 4
  },
  contentContainer: {
    backgroundColor: palette.white,
    borderColor: palette.border,
    borderRadius: 4,
    borderWidth: 1,
    height: SCREEN_HEIGHT * 0.48,
    justifyContent: 'center',
    width: '85%'
  },
  thanksText: {
    color: palette.black,
    fontSize: 18
  },
  topSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
