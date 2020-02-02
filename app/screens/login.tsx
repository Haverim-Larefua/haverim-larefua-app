import * as React from "react"
import { StyleSheet, View} from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import {Button, Icon, Screen, TextField} from "../components"

export interface LoginProps extends NavigationInjectedProps<{}> {}

export const LoginScreen: React.FunctionComponent<LoginProps> = props => {
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
