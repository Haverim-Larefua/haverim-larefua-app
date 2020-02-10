import * as React from "react"
import { PackageData, PackageStatus } from "../packagesList/types"
import { StyleSheet, View } from "react-native"
import { Text } from "../../components"
import { getThemeColorsByPackageStatus, ThemeColors } from "../../theme"

interface PackageStatusHeaderProps{
    packageData: PackageData
    themeColor?: ThemeColors
}

export const PackageStatusHeader: React.FunctionComponent<PackageStatusHeaderProps> = props => {
  const { packageData } = props;
  const themeColors = props.themeColor || getThemeColorsByPackageStatus(PackageStatus[packageData.parcelTrackingStatus])
  return (
    <View style={{ ...styles.container, backgroundColor: themeColors.backgroundColor }}>
      <Text preset={'bold'} style={{ ...styles.statusText, color: themeColors.textColor }} text={`${PackageStatus[packageData.parcelTrackingStatus]}`}/>
      <Text text={'00:00'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flexDirection: 'row-reverse',
    padding: 20
  },
  statusText: {
    flex: 1
  }
})
