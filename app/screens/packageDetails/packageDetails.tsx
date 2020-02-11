import * as React from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { Button, Screen, Text } from "../../components"
import { PackageData, PackageStatus } from "../packagesList/types"
import { PackageStatusHeader } from "./packageStatusHeader"
import { NavigationInjectedProps } from "react-navigation"
import { color } from "../../theme"

interface PackageDetailsScreenProps {
    packageData: PackageData
}

export const PackageDetailsScreen: React.FunctionComponent<NavigationInjectedProps<PackageDetailsScreenProps>> = props => {
  const packageData = props.navigation.state.params.packageData
  const renderFullNameView = (): React.ReactElement => {
    return (
      <View style={styles.fullNameView}>
        <Text preset={'header'} text={`${packageData.receiver.lastName} ${packageData.receiver.firstName}`} />
      </View>
    )
  }

  const renderDetailsView = (title: string, isTitleBolded = false, explanationText: string): React.ReactElement => {
    return (
      <View style={styles.detailsView}>
        <View>
          <Text preset={isTitleBolded ? 'bold' : 'default'} text={title}/>
          <Text text={explanationText} />
        </View>
      </View>
    )
  }

  const renderApproveButton = (): React.ReactElement => {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button
          style={{ marginHorizontal: 12, marginBottom: 12 }}
          text={packageData.status === PackageStatus.ReadyForDelivery ? 'איסוף חבילה' : 'מסירת חבילה'}
          onPress={() => {
            props.navigation.navigate('deliveryConfirmation', { packageData })
          }}
        />
      </SafeAreaView>
    )
  }

  return (
    <Screen preset="fixed" >
      <PackageStatusHeader packageData={packageData}/>
      {renderFullNameView()}
      {renderDetailsView('טלפון', false, '0524897564')}
      {renderDetailsView(packageData.destination.city, false, `${packageData.destination.street} ${packageData.destination.number}/${packageData.destination.apartment}`)}
      {renderDetailsView('פרטים נוספים', true, 'יש שער גדול והקוד הוא 7364. יש בחצר כלב אז אם הוא ישן נא לא להעיר אותו')}
      {
        packageData.status !== PackageStatus.Delivered &&
        renderApproveButton()
      }
    </Screen>
  )
}

const styles = StyleSheet.create({
  detailsView: {
    borderBottomWidth: 1,
    borderColor: color.palette.lighterGrey,
    flexDirection: 'row-reverse',
    paddingBottom: 24,
    paddingHorizontal: 20,
    paddingTop: 22
  },
  fullNameView: {
    borderColor: color.palette.lighterGrey,
    borderWidth: 1,
    paddingBottom: 18,
    paddingRight: 20,
    paddingTop: 22
  }
})
