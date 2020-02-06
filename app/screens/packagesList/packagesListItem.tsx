import * as React from "react"
import { PackageData } from "./types"
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { color, spacing } from "../../theme"
import { PackageStatusTag } from "./packageStatusTag"

interface PackagesListItemProps {
    packageData: PackageData
    onLongPress?: () => void
    onPress?: () => void
    showSelectedStyle?: boolean
    style?: StyleProp<ViewStyle>
}
export const PackagesListItem: React.FunctionComponent<PackagesListItemProps> = props => {
  const { packageData, onPress, onLongPress, showSelectedStyle = false } = props
  const borderColor = showSelectedStyle ? '#1e4ce0' : '#ededed'

  const renderReceiverDetails = (): React.ReactElement => {
    return (
      <View style={styles.destinationContainer}>
        <Text preset={'bold'} style={styles.nameStyle} text={`${packageData.receiver.lastName} ${packageData.receiver.firstName}`} />
        <Text style={styles.cityStyle} preset={'default'} text={`${packageData.destination.city}`} />
        <Text preset={'default'} text={`${packageData.destination.street} ${packageData.destination.number}/${packageData.destination.apartment}`} />
      </View>
    )
  }
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={[styles.container, props.style, { borderColor }]}>
      {renderReceiverDetails()}
      <PackageStatusTag status={packageData.status}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cityStyle: {
    marginBottom: 2
  },
  container: {
    backgroundColor: color.palette.white,
    borderRadius: 4,
    borderWidth: 2,
    flexDirection: 'row-reverse',
    paddingVertical: spacing.mediumSpacing
  },
  destinationContainer: {
    flex: 1,
    marginRight: spacing.halfPadding
  },
  nameStyle: {
    fontSize: 18
  }
})
