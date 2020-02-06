import * as React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { Screen } from "../../components"
import { color } from "../../theme"
import { PackageData } from "../packagesList/types"
import { PackageStatusHeader } from "./packageStatusHeader"
import { NavigationInjectedProps } from "react-navigation"

interface PackageDetailsScreenProps {
    packageData: PackageData
}

export const PackageDetailsScreen: React.FunctionComponent<NavigationInjectedProps<PackageDetailsScreenProps>> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Screen preset="fixed" backgroundColor={color.transparent}>
        <PackageStatusHeader packageData={props.navigation.state.params.packageData}/>
      </Screen>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
