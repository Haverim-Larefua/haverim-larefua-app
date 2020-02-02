import * as React from "react"
import { StyleSheet, View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import {Button, Checkbox, Icon, Screen, TextField} from "../components"
import { spacing } from "../theme";
import {Toggle} from "react-powerplug";

export interface LoginProps extends NavigationInjectedProps<{}> {}

export const LoginScreen: React.FunctionComponent<LoginProps> = props => {
  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagesList'), [props.navigation])
  return (
    <View style={{ flex: 1 }}>
      <Screen style={styles.container} preset="scroll" backgroundColor={'#fff'}>
        <Icon style={styles.icon} icon="loginLogo" />
        <TextField label={"שם משתמש.ת"} />
        <TextField style={styles.passwordTextField} label={"סיסמה"} />
        <View style={styles.rememberMeContainer}>
          <Toggle initial={false}>
            {({ on, toggle }) => <Checkbox value={on} onToggle={toggle} text="זכור אותי" />}
          </Toggle>
        </View>
        <Button text={'כניסה'} />
      </Screen>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.regularPadding
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 65,
    marginTop: 75
  },
  passwordTextField: {
    marginBottom: 17,
    marginTop: 14
  },
  rememberMeContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
    marginBottom: spacing.bigSpacing
  }

});
