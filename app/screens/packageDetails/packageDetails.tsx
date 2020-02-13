import React, { FC, ReactElement, useMemo } from "react"
import { SafeAreaView, StyleSheet, View, Linking, TouchableOpacity } from "react-native"
import { Button, Header, Icon, Screen, Text } from "../../components"
import { PackageData, PackageStatus, PackageStatusAPI } from "../packagesList/types"
import { PackageStatusHeader } from "./packageStatusHeader"
import { NavigationInjectedProps } from "react-navigation"
import { color } from "../../theme"
import { useStores } from "../../models/root-store"
import { observer } from "mobx-react-lite"
import { IconTypes } from "../../components/icon/icons"
import { IS_IOS } from "../../constants/constants"

interface PackageDetailsScreenProps {
    packageData: PackageData
}

export const PackageDetailsScreen: FC<NavigationInjectedProps<PackageDetailsScreenProps>> = observer(props => {
  const packageData = props.navigation.state.params.packageData
  const goBack = useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  const { packagesStore: { updatePackagesStatus } } = useStores()

  const onIconPressed = (iconName: IconTypes): void => {
    const { phone, city, address } = packageData
    const formattedAddress = `${address} ${city}`
    const nativeNavigationAppURL = IS_IOS
      ? `https://maps.apple.com/?daddr=${formattedAddress}`
      : `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${formattedAddress}`

    switch (iconName) {
      case "call": { Linking.openURL(`tel:${phone}`); break }
      case "msg": { Linking.openURL(`sms:${phone}`); break }
      case "waze": { Linking.openURL(`https://waze.com/ul?q=${formattedAddress}`); break }
      case "location": { Linking.openURL(nativeNavigationAppURL); break }
      default: break
    }
  }

  const renderFullNameView = (): ReactElement => {
    return (
      <View style={styles.fullNameView}>
        <Text preset={'header'} text={`${packageData.customerName}`} />
      </View>
    )
  }

  const renderIcons = (firstIcon: IconTypes, secondIcon: IconTypes): ReactElement => {
    return (
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => { onIconPressed(firstIcon) }} >
          <Icon containerStyle={styles.iconContainer} icon={firstIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { onIconPressed(secondIcon) }} >
          <Icon containerStyle={styles.iconContainer} icon={secondIcon}/>
        </TouchableOpacity>
      </View>
    )
  }

  const renderPhoneDetails = (): ReactElement => {
    const { phone } = packageData
    return (
      <View style={styles.detailsView}>
        <View>
          <Text text={'טלפון'}/>
          <Text text={phone} />
        </View>
        {renderIcons('call', 'msg')}
      </View>
    )
  }

  const renderAddressDetails = (): ReactElement => {
    const { city, address } = packageData
    return (
      <View style={styles.detailsView}>
        <View>
          <Text text={city}/>
          <Text text={`${address}`} />
        </View>
        {renderIcons("waze", "location")}
      </View>
    )
  }

  const renderMoreDetails = (): ReactElement => {
    const { comments } = packageData
    return (
      <View style={[styles.detailsView, { borderBottomWidth: 0 }]}>
        <View>
          <Text preset={'bold'} text={'פרטים נוספים'}/>
          <Text text={comments} />
        </View>
      </View>
    )
  }

  const onApproveButtonPress = async() => {
    if (PackageStatusAPI[packageData.parcelTrackingStatus] === PackageStatusAPI.ready) {
      await updatePackagesStatus([packageData.id], PackageStatusAPI.distribution)
      props.navigation.navigate('packagesList')
    } else {
      props.navigation.navigate('deliveryConfirmation', { packageData })
      // todo go to signature page
    }
  }
  const renderApproveButton = (): ReactElement => {
    return (
      <SafeAreaView style={styles.buttonContainer}>
        <Button
          style={{ marginHorizontal: 12, marginBottom: 12 }}
          onPress={() => onApproveButtonPress()}
          text={PackageStatus[packageData.parcelTrackingStatus] === PackageStatus.ready ? 'איסוף חבילה' : 'מסירת חבילה'}
        />
      </SafeAreaView>
    )
  }

  return (
    <Screen style={styles.container} preset="scroll" >
      <Header
        rightIcon="rightArrow"
        rightTitle={"חזור"}
        onRightPress={goBack}
      />
      <PackageStatusHeader packageData={packageData}/>
      {renderFullNameView()}
      {renderPhoneDetails()}
      {renderAddressDetails()}
      {renderMoreDetails()}
      {
        (PackageStatus[packageData.parcelTrackingStatus] !== PackageStatus.delivered) &&
        renderApproveButton()
      }
    </Screen>
  )
})

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1
  },
  detailsView: {
    borderBottomWidth: 1,
    borderColor: color.palette.lighterGrey,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
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
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: color.palette.greyLight,
    borderRadius: 45 / 2,
    height: 45,
    justifyContent: 'center',
    margin: 7,
    width: 45
  },
  iconsContainer: {
    flexDirection: 'row',
  }
})
