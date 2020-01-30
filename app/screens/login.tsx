import * as React from "react"
import { TextStyle, View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Button, Header, Screen } from "../components"
import { color, spacing } from "../theme"

export interface LoginProps extends NavigationInjectedProps<{}> {}

export const LoginScreen: React.FunctionComponent<LoginProps> = props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])
  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagesList'), [props.navigation])
  return (
    <View style={{ flex: 1 }}>
      <Screen preset="scroll" backgroundColor={'#fff'}>
        <Header
          headerText="login page"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <Button
          text="go to packages list page"
          onPress={goToNextPage}
        />
      </Screen>
    </View>
  )
}

const HEADER: TextStyle = {
  paddingTop: spacing[4],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 5,
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: color.palette.black
}
