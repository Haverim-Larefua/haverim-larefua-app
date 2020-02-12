import React, { ReactElement } from "react"
import { View, StyleSheet } from "react-native"
import { HeaderProps } from "./header.props"
import { Button, Icon, Text } from "../"
import { translate } from "../../i18n/"
import { HEADER_HEIGHT, SCREEN_WIDTH } from "../../constants/constants"

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header: React.FunctionComponent<HeaderProps> = props => {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
    rightTitle
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  const renderIconText = (text: string): ReactElement => {
    return <Text style={styles.buttonText} preset="bold" text={text} />
  }

  return (
    <View style={{ ...styles.root, ...style }}>
      {leftIcon ? (
        <Button preset="link" onPress={onLeftPress}>
          <Icon icon={leftIcon} />
        </Button>
      ) : (
        <View style={styles.left} />
      )}
      <View style={styles.titleMiddle}>
        <Text style={{ ...styles.title, ...titleStyle }} text={header} />
      </View>
      {rightIcon || rightTitle ? (
        <Button style={styles.button} preset="link" onPress={onRightPress}>
          {rightTitle && renderIconText(rightTitle) }
          {rightIcon && <Icon icon={rightIcon} />}
        </Button>
      ) : (
        <View style={styles.right} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    fontSize: 14,
    paddingHorizontal: 19
  },
  left: { width: 32 },
  right: { width: 32 },
  root: {
    alignItems: "center",
    flexDirection: "row",
    height: HEADER_HEIGHT,
    justifyContent: "flex-start",
    paddingHorizontal: 17,
    width: SCREEN_WIDTH
  },
  title: {
    textAlign: "center"
  },
  titleMiddle: {
    flex: 1,
    justifyContent: "center"
  }
})
