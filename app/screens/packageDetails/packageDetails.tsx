import React, { FC, ReactElement, useMemo } from "react"
import { SafeAreaView, StyleSheet, View, Linking, TouchableOpacity } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { observer } from "mobx-react-lite"
import { Button, Header, Icon, Screen, Text } from "../../components"
import { PackageData, PackageStatus, PackageStatusAPI } from "../packagesList/types"
import { PackageStatusHeader } from "./packageStatusHeader"
import { color } from "../../theme"
import { useStores } from "../../models/root-store"
import { IconTypes } from "../../components/icon/icons"
import { IS_IOS } from "../../constants/constants"

interface PackageDetailsScreenProps {
    packageData: PackageData
}

export const PackageDetailsScreen: FC<NavigationInjectedProps<PackageDetailsScreenProps>> = observer(props => {
  const { packageData} = props.navigation.state.params
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

  const renderIcon = (iconName: IconTypes): ReactElement => {
    return (
      <TouchableOpacity onPress={() => { onIconPressed(iconName) }} >
        <Icon containerStyle={styles.iconContainer} icon={iconName}/>
      </TouchableOpacity>
    )
  }

  const renderIcons = (firstIcon: IconTypes, secondIcon: IconTypes): ReactElement => {
    return (
      <View style={styles.iconsContainer}>
        {renderIcon(firstIcon)}
        {renderIcon(secondIcon)}
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
        <View style={{width: '60%'}}>
          <Text text={city}/>
          <Text text={`${address}`} />
        </View>
        {renderIcons('waze', 'location')}
      </View>
    )
  }

  const renderMoreDetails = (): ReactElement => {
    const { comments } = packageData
    return (
      <View style={[styles.detailsView, styles.bottomDetailsContainer]}>
        <View>
          <Text preset={'bold'} text={'פרטים נוספים'}/>
          <Text text={comments} />
          {renderReportProblem()}
        </View>
      </View>
    )
  }

  const onReportProblemPress = ()=>{
    props.navigation.navigate('packageProblem', { packageData })
  }

  const renderReportProblem = (): ReactElement => {
    return (
        <View style={styles.problemContainer}>
          <Button
              style={styles.problemButton}
              onPress={onReportProblemPress}
          >
            <Icon icon={'msg'}/>
            <Text style={styles.problemButtonText}>דיווח על בעיה</Text>
          </Button>
        </View>
    )
  }

  const onApproveButtonPress = async() => {
    if (PackageStatusAPI[packageData.parcelTrackingStatus] === PackageStatusAPI.assigned) {
      await updatePackagesStatus([packageData.id], PackageStatusAPI.distribution)
      props.navigation.navigate('packagesTabList')
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
          text={PackageStatus[packageData.parcelTrackingStatus] === PackageStatus.assigned ? 'איסוף חבילה' : 'מסירת חבילה'}
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
    justifyContent: 'flex-end',
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
  },
  bottomDetailsContainer: {
    borderBottomWidth: 0,
    flex: 1,
    height: '100%'
  },
  problemButton: {
    alignItems: "center",
    borderColor: color.palette.lighterGrey,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 5,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row-reverse",
    backgroundColor: "#FFF"
  },
  problemButtonText: {
    color: color.palette.darkBlue,
    fontWeight: "bold",
    fontSize: 14,
    paddingBottom: 3
  },
  problemContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
})
