import { ViewStyle, TextStyle } from "react-native"
import { IconTypes } from "../icon/icons"

export interface HeaderProps {
  headerTx?: string
  headerText?: string
  leftIcon?: IconTypes
  onLeftPress?(): void
  rightIcon?: IconTypes
  rightTitle?: string
  onRightPress?(): void
  style?: ViewStyle
  titleStyle?: TextStyle
}
