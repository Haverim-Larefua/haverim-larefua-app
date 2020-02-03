import * as React from "react"
import { PackageData } from "./types"
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native"
import { Text } from "../../components"
import {color, spacing} from "../../theme";
import {PackageStatusTag} from "./packageStatusTag";

interface PackagesListItemProps {
    packageData: PackageData
    style?: StyleProp<ViewStyle>
}
export const PackagesListItem: React.FunctionComponent<PackagesListItemProps> = props => {
  const { packageData } = props
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.destinationContainer}>
        <Text preset={'bold'} style={styles.nameStyle} text={`${packageData.receiver.lastName} ${packageData.receiver.firstName}`} />
        <Text style={styles.cityStyle} preset={'default'} text={`${packageData.destination.city}`} />
        <Text preset={'default'} text={`${packageData.destination.street} ${packageData.destination.number}/${packageData.destination.apartment}`} />
      </View>
      <PackageStatusTag status={packageData.status}/>
    </View>
  )
}

const styles = StyleSheet.create({
  cityStyle: {
    marginBottom: 2
  },
  container: {
    backgroundColor: color.palette.white,
    borderRadius: 4,
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
