import * as React from "react"
import { FlatList, View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Button, Screen, Text } from "../../components"
import { PackageData, PackageStatus } from "./types";
import {PackagesListItem} from "./packagesListItem";

export interface PackagesListSProps extends NavigationInjectedProps<{}> {}

export const PackagesListScreen: React.FunctionComponent<PackagesListSProps> = props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])
  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagePickUp'), [props.navigation])
  return (
    <View style={{ flex: 1 }}>
      <Screen preset="fixed" backgroundColor={'#fff'}>
        <FlatList keyExtractor={(packageData) => packageData.packageId} data={mockData} renderItem={(packageData) => {
          return <PackagesListItem packageData={packageData.item}/>
        }}/>
        <Button
          text="go to package pick up screen"
          onPress={() => goBack()}
        />
      </Screen>
    </View>
  )
}

const mockData: PackageData[] = [
  {
    packageId: '1',
    destination: {
      city: 'באר שבע',
      street: 'ישראל רבי עקיבא',
      number: '30',
      apartment: '45'
    },
    status: PackageStatus.ReadyForDelivery,
    receiver: {
      firstName: 'מירב',
      lastName: 'בן אבו',
      id: '123'
    },
    messenger: {
      firstName: 'ישראל',
      lastName: 'ישראלי',
      id: '4567'
    }
  }
]
