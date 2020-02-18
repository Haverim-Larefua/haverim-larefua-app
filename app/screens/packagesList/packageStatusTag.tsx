import * as React from "react"
import { Text } from "../../components"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { PackageStatus } from "./types"
import { getThemeColorsByPackageStatus } from "../../theme"

interface PackageStatusTagProps {
  status: PackageStatus
    style?: StyleProp<ViewStyle>
}

export const PackageStatusTag: React.FunctionComponent<PackageStatusTagProps> = props => {
  const { status, style } = props
  const tagTheme = getThemeColorsByPackageStatus(status)
  return (
    <View style={[styles.container, { backgroundColor: tagTheme.backgroundColor }, style]}>
      <Text style={{ ...styles.text, color: tagTheme.textColor }} preset="secondary" text={status} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    marginLeft: 15,
    minWidth: 104
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 2,
    textAlignVertical: 'top'
  }
})
