import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Text } from "../"
import { viewPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { mergeAll, flatten } from "ramda"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "button",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props

  const viewStyle = mergeAll(flatten([viewPresets[preset] || viewPresets.button, styleOverride]))
  const textStyle = mergeAll(
    flatten([textStyleOverride]),
  )

  const content = children || <Text tx={tx} text={text} preset={'buttonText'} style={textStyle} />

  return (
    <TouchableOpacity style={[viewStyle, rest.disabled && styles.disabledButton]} {...rest}>
      {content}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  disabledButton: { opacity: 0.3 }
})
