import * as React from "react"
import { View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Button, Screen } from "../components"

export interface PackagesListSProps extends NavigationInjectedProps<{}> {}

export const PackagesListScreen: React.FunctionComponent<PackagesListSProps> = props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])
  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagePickUp'), [props.navigation])
  return (
    <View style={{ flex: 1 }}>
      <Screen preset="scroll" backgroundColor={'#fff'}>
        <Button
          text="go to package pick up screen"
          onPress={() => goBack()}
        />
      </Screen>
    </View>
  )
}
