import React, { FC, ReactElement, useMemo, useState } from "react"
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Button, Header, Screen, Text, ThankYouPopup } from "../components"
import SignatureCapture from "react-native-signature-capture"
import { SCREEN_HEIGHT } from "../constants/constants"
import { color } from "../theme"
import { PackageStatusHeader } from "./packageDetails/packageStatusHeader"
import { PackageData, PackageStatusAPI } from "./packagesList/types"
import { useStores } from "../models/root-store"

interface PackageDeliveryConfirmationProps {
  packageData: PackageData;
}

let signatureCaptureRef = null

export const PackageDeliveryConfirmationScreen: FC<NavigationInjectedProps<PackageDeliveryConfirmationProps>> = props => {
  const { navigation } = props
  const packageData = navigation.getParam('packageData')
  const [notes, setNotes] = useState('')
  const [isSignature, setIsSignature] = useState(false)
  const [showPopUp, setShowPopUP] = useState(false)
  const { packagesStore: { addSignature } } = useStores()
  const goBack = useMemo(() => () => navigation.goBack(null), [props.navigation])

  const renderSignature = (): ReactElement => {
    return (
      <View>
        <Text style={styles.title} preset="bold" text={"חתימת המקבל/ת"} />
        <View style={styles.signatureAreaContainer}>
          <SignatureCapture
            ref={sc => signatureCaptureRef = sc}
            style={styles.signatureCapture}
            viewMode={"portrait"}
            showTitleLabel={false}
            showNativeButtons={false}
            showBorder={false}
            onDragEvent={(isDragging) => { !isSignature && setIsSignature(isDragging) }}
            onSaveEvent={async(base64Image) => {
              const response = await addSignature(packageData.id, base64Image.encoded)
              if (response.ok) {
                setShowPopUP(true)
              }
            }}
          />
        </View>
      </View>
    )
  }

  const renderNotes = (): ReactElement => {
    return (
      <View>
        <Text style={styles.title} preset="bold" text={"הערות"} />
        <TextInput style={styles.notes}
          onChangeText={text => setNotes(text)}
          value={notes}
          multiline
          scrollEnabled={false}
        />
      </View>
    )
  }

  const renderPopUp = () => {
    return (
      <ThankYouPopup
        visible={showPopUp}
        onPress={() => {
          props.navigation.navigate('packagesList')
          setShowPopUP(false)
        }}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <Screen unsafe backgroundColor={backgroundColor} preset={"scroll"} style={styles.screen}>
        {renderPopUp()}
        <Header
          rightIcon="rightArrow"
          rightTitle={"חזרה"}
          onRightPress={goBack}
        />
        <PackageStatusHeader
        // @ts-ignore
          packageData={{ ...packageData, parcelTrackingStatus: PackageStatusAPI.whileDelivering }}
        />
        <View style={styles.contentContainer}>
          {renderSignature()}
          {renderNotes()}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            text={'אישור מסירה'}
            disabled={!isSignature}
            onPress={() => {
              signatureCaptureRef.saveImage()
              signatureCaptureRef.resetImage()
              setIsSignature(false)
            }}/>
        </View>
      </Screen>
    </SafeAreaView>
  )
}

const CONTENT_PADDING = 12
const SIGNATURE_CAPTURE_HEIGHT = SCREEN_HEIGHT * 0.39
const borderColor = color.palette.border
const borderRadius = 4
const borderWidth = 1
const backgroundColor = '#fff'

const styles = StyleSheet.create({
  button: {
    height: 48,
    margin: CONTENT_PADDING
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  contentContainer: {
    justifyContent: 'space-between',
    paddingTop: CONTENT_PADDING
  },
  notes: {
    borderColor,
    borderRadius,
    borderWidth,
    height: SCREEN_HEIGHT * 0.17,
    marginHorizontal: CONTENT_PADDING,
  },
  screen: {
    flexGrow: 1
  },
  signatureAreaContainer: {
    borderColor,
    borderRadius,
    borderWidth,
    height: SIGNATURE_CAPTURE_HEIGHT,
    justifyContent: 'center',
    marginHorizontal: CONTENT_PADDING,
  },
  signatureCapture: {
    height: SIGNATURE_CAPTURE_HEIGHT - (borderRadius + (borderWidth * 2)),
    marginHorizontal: borderWidth
  },
  title: {
    fontSize: 14,
    lineHeight: 24,
    paddingHorizontal: CONTENT_PADDING
  }
})
