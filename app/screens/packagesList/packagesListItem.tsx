import * as React from "react"
import { PackageData } from "./types"
import { View } from "react-native"
import { Text } from "../../components"

interface PackagesListItemProps {
    packageData: PackageData
}
export const PackagesListItem: React.FunctionComponent<PackagesListItemProps> = props => {
  return (
    <View style={{ flexDirection: 'row-reverse' }}>
      <View>
        <Text preset={'bold'} style={{ fontSize: 18 }} text={`${props.packageData.receiver.firstName} ${props.packageData.receiver.lastName}`} />
        <Text preset={'default'} text={`${props.packageData.destination.city}`} />
        <Text preset={'default'} text={`${props.packageData.destination.street} ${props.packageData.destination.number}/${props.packageData.destination.apartment}`} />
      </View>
      <View>
        <Text text={'בחלוקה'} />
      </View>
    </View>
  )
}
