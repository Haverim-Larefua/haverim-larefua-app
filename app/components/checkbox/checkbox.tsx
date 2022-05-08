import * as React from "react"
import { TouchableOpacity, TextStyle, ViewStyle } from "react-native"
import { Icon, Text } from "../"
import { spacing } from "../../theme"
import { CheckboxProps } from "./checkbox.props"
import { mergeAll, flatten } from "ramda"

const ROOT: ViewStyle = {
  flexDirection: "row-reverse",
  paddingVertical: spacing[1],
}

const LABEL: TextStyle = { paddingRight: spacing.mediumSpacing }

export function Checkbox(props: CheckboxProps) {
  const numberOfLines = props.multiline ? 0 : 1

  const rootStyle = mergeAll(flatten([ROOT, props.style]))

  const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}
    >
      <Icon style={props.iconsStyle} icon={props.value ? "checkboxOn" : "checkboxOff"} />
      {!!props.text && <Text text={props.text} tx={props.tx} numberOfLines={numberOfLines} style={LABEL} />}
    </TouchableOpacity>
  )
}
