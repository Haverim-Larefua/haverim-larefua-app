import * as React from "react"
import { PackageData, PackageStatus, PackageStatusAPI } from "../packagesList/types"
import { StyleSheet, View } from "react-native"
import { Text } from "../../components"
import { getThemeColorsByPackageStatus } from "../../theme"

interface PackageStatusHeaderProps{
    packageData: PackageData
}

export const PackageStatusHeader: React.FunctionComponent<PackageStatusHeaderProps> = props => {
  const { packageData } = props
  const themeColors = getThemeColorsByPackageStatus(PackageStatus[packageData.parcelTrackingStatus])

  const formatTime = (num: string) => {
    if (num.length === 1) {
      return `0${num}`
    }
    return num
  }

  const renderTimer = () => {
    const { lastUpdateDate, parcelTrackingStatus } = packageData
    if (parcelTrackingStatus as any === PackageStatusAPI.distribution) {
      const diffTime = Math.abs(new Date(lastUpdateDate) as any - (new Date() as any))
      const hours = (diffTime / (1000 * 60 * 60)).toFixed(0)
      const minutes = ((diffTime / (1000 * 60)) % 60).toFixed(0)
      return (
        <Text text={`${formatTime(hours)}:${formatTime(minutes)}`}/>
      )
    }
    return null
  }
  return (
    <View style={{ ...styles.container, backgroundColor: themeColors.backgroundColor }}>
      <Text preset={'bold'} style={{ ...styles.statusText, color: themeColors.textColor }} text={`${PackageStatus[packageData.parcelTrackingStatus]}`}/>
      {renderTimer()}
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
