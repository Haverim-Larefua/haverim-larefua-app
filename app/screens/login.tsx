import * as React from "react"
import { StyleSheet, View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Button, Checkbox, Icon, Screen, TextField } from "../components"
import { color, spacing } from "../theme"
import { Toggle } from "react-powerplug"

export interface LoginProps extends NavigationInjectedProps<{}> {}

export const LoginScreen: React.FunctionComponent<LoginProps> = props => {
  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagesList'), [props.navigation])

  const renderLoginIcon = (): React.ReactElement => {
    return <Icon style={styles.icon} icon="loginLogo" />
  }
  const renderTextFields = (): React.ReactElement => {
    return (
      <View>
        <TextField label={"שם משתמש.ת"} />
        <TextField style={styles.passwordTextField} label={"סיסמה"} />
      </View>
    )
  }

  const renderCheckbox = (): React.ReactElement => {
    return (
      <View style={styles.rememberMeContainer}>
        <Toggle initial={false}>
          {({ on, toggle }) => <Checkbox value={on} onToggle={toggle} text="זכור אותי" />}
        </Toggle>
      </View>
    )
  }

  const renderLoginButton = (): React.ReactElement => {
    return <Button text={'כניסה'} onPress={() => goToNextPage()}/>
  }
  return (
    <View style={styles.container}>
      <Screen preset="scroll" backgroundColor={color.palette.white}>
        {renderLoginIcon()}
        {renderTextFields()}
        {renderCheckbox()}
        {renderLoginButton()}
      </Screen>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
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
    marginBottom: spacing.bigSpacing,
    width: '100%'
  }
})
