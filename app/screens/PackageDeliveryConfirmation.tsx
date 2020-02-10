import React, { FC, useMemo, useState, ReactElement } from "react"
import { StyleSheet, View, TextInput } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Button, Header, Screen, Text } from "../components"
import SignatureCapture from 'react-native-signature-capture'
import { SCREEN_HEIGHT } from "../constants/constants"
import { color, ThemeColors } from "../theme"
import { PackageStatusHeader } from "./packageDetails/packageStatusHeader"
import { PackageData } from "./packagesList/types"

interface PackageDeliveryConfirmationProps {
  packageData: PackageData;
}

let signatureCaptureRef = null

export const PackageDeliveryConfirmationScreen: FC<NavigationInjectedProps<PackageDeliveryConfirmationProps>> = props => {
  const { navigation } = props
  const packageData = navigation.getParam('packageData')
  const [notes, setNotes] = useState('')
  const [isSignature, setIsSignature] = useState(false)

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
            onSaveEvent={(e) => { console.log('onSaveEvent', e) }}
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
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Screen backgroundColor={backgroundColor}>
        <Header
          rightIcon="rightArrow"
          rightTitle={"חזרה"}
          onRightPress={goBack}
        />
        <PackageStatusHeader packageData={{ ...packageData, status: 'מסירת חבילה' }} themeColor={statusHeaderColors}/>
        <View style={styles.contentContainer}>
          {renderSignature()}
          {renderNotes()}
        </View>
        <Button
          style={styles.button}
          text={'אישור מסירה'}
          disabled={!isSignature}
          onPress={() => {
            console.log('signatureCaptureRef', signatureCaptureRef)
            signatureCaptureRef.saveImage()
            signatureCaptureRef.resetImage()
            setIsSignature(false)
            // todo: call API and change package status
          }}/>
      </Screen>
    </View>
  )
}

const CONTENT_PADDING = 12
const SIGNATURE_CAPTURE_HEIGHT = SCREEN_HEIGHT * 0.39
const borderColor = color.palette.border
const borderRadius = 4
const borderWidth = 1
const backgroundColor = '#fff'
const statusHeaderColors: ThemeColors = { backgroundColor: '#f0f1fb', textColor: color.palette.black }

const styles = StyleSheet.create({
  button: {
    height: 48,
    margin: CONTENT_PADDING
  },
  container: {
    backgroundColor,
    flex: 1
  },
  contentContainer: {
    flex: 1,
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
