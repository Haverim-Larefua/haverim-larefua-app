import * as React from "react"
import { StyleSheet, TextStyle, View} from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import {Button, Header, Icon, Screen, TextField} from "../components"
import { color, spacing } from "../theme"

export interface LoginProps extends NavigationInjectedProps<{}> {}

export const LoginScreen: React.FunctionComponent<LoginProps> = props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])
  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagesList'), [props.navigation])
  return (
    <View style={{ flex: 1 }}>
      <Screen preset="scroll" backgroundColor={'#fff'}>
        <Icon style={styles.icon} icon="loginLogo" />
        <TextField label={"שם משתמש.ת"} />
        <Button
          text="go to packages list page"
          onPress={goToNextPage}
        />
      </Screen>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginTop: 75
  }
});
