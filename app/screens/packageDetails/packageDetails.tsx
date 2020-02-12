import * as React from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { Button, Header, Screen, Text } from "../../components"
import { PackageData, PackageStatus, PackageStatusAPI } from "../packagesList/types"
import { PackageStatusHeader } from "./packageStatusHeader"
import { NavigationInjectedProps } from "react-navigation"
import { color } from "../../theme"
import { useStores } from "../../models/root-store"
import reactotron from "reactotron-react-native"
import { observer } from "mobx-react-lite"
import { useMemo } from "react"

interface PackageDetailsScreenProps {
    packageData: PackageData
}

export const PackageDetailsScreen: React.FunctionComponent<NavigationInjectedProps<PackageDetailsScreenProps>> = observer(props => {
  const packageData = props.navigation.state.params.packageData
  const goBack = useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  const { packagesStore: { updatePackagesStatus } } = useStores()

  const renderFullNameView = (): React.ReactElement => {
    return (
      <View style={styles.fullNameView}>
        <Text preset={'header'} text={`${packageData.customerName}`} />
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

  const onApproveButtonPress = async() => {
    if (PackageStatusAPI[packageData.parcelTrackingStatus] === PackageStatusAPI.ready) {
      await updatePackagesStatus([packageData.id], PackageStatusAPI.distribution)
      props.navigation.navigate('packagesList')
    } else {
      reactotron.log('asd')
      props.navigation.navigate('deliveryConfirmation', { packageData })
      // todo go to signature page
    }
  }
  const renderApproveButton = (): React.ReactElement => {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button
          style={{ marginHorizontal: 12, marginBottom: 12 }}
          onPress={() => onApproveButtonPress()}
          text={PackageStatus[packageData.parcelTrackingStatus] === PackageStatus.ready ? 'איסוף חבילה' : 'מסירת חבילה'}
        />
      </SafeAreaView>
    )
  }
  return (
    <Screen preset="fixed" >
      <Header
        rightIcon="rightArrow"
        rightTitle={"חזור"}
        onRightPress={goBack}
      />
      <PackageStatusHeader packageData={packageData}/>
      {renderFullNameView()}
      {renderDetailsView('טלפון', false, '0524897564')}
      {renderDetailsView(packageData.city, false, `${packageData.address}`)}
      {renderDetailsView('פרטים נוספים', true, packageData.comments)}
      {
        (PackageStatus[packageData.parcelTrackingStatus] !== PackageStatus.delivered) &&
        renderApproveButton()
      }
    </Screen>
  )
})

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
