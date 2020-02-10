import * as React from "react"
import { SafeAreaView, View } from "react-native"
import { Button, Screen, Text } from "../../components"
import { PackageData, PackageStatus } from "../packagesList/types"
import { PackageStatusHeader } from "./packageStatusHeader"
import { NavigationInjectedProps } from "react-navigation"
import { color } from "../../theme"

interface PackageDetailsScreenProps {
    packageData: PackageData
}

export const PackageDetailsScreen: React.FunctionComponent<NavigationInjectedProps<PackageDetailsScreenProps>> = props => {
  const { navigation } = props
  const packageData = navigation.getParam('packageData')
  return (
    <Screen preset="fixed" >
      <PackageStatusHeader packageData={packageData}/>
      <View style={{ paddingTop: 22, paddingRight: 20, paddingBottom: 18, borderColor: color.palette.lighterGrey, borderWidth: 1 }}>
        <Text preset={'header'} text={`${packageData.receiver.lastName} ${packageData.receiver.firstName}`} />
      </View>
      <View style={{ flexDirection: 'row-reverse', paddingTop: 22, paddingBottom: 24, paddingHorizontal: 20, borderColor: color.palette.lighterGrey, borderBottomWidth: 1 }}>
        <View>
          <Text text={'טלפון'}/>
          <Text text={'052486589'} />
        </View>
      </View>
      <View style={{ flexDirection: 'row-reverse', paddingTop: 22, paddingBottom: 24, paddingHorizontal: 20, borderColor: color.palette.lighterGrey, borderBottomWidth: 1 }}>
        <View>
          <Text text={packageData.destination.city}/>
          <Text preset={'default'} text={`${packageData.destination.street} ${packageData.destination.number}/${packageData.destination.apartment}`} />
        </View>
      </View>
      <View style={{ paddingTop: 14, paddingHorizontal: 20, flex: 1 }}>
        <Text text={'פרטים נוספים'} />
        <Text text={'יש שער גדול והקוד הוא 7364. יש בחצר כלב אז אם הוא ישן נא לא להעיר אותו'}/>
      </View>
      {
        packageData.status !== PackageStatus.Delivered &&
            <SafeAreaView>
              <Button
                style={{ marginHorizontal: 12, marginBottom: 12 }} text={packageData.status === PackageStatus.ReadyForDelivery ? 'איסוף חבילה' : 'מסירת חבילה'}
                onPress={() => {
                  navigation.navigate('deliveryConfirmation', { packageData })
                }}
              />
            </SafeAreaView>
      }
    </Screen>
  )
}
