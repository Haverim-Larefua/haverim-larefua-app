import React, { useState } from "react"
import { observer, useObserver } from 'mobx-react-lite'
import { StyleSheet, View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Button, Checkbox, Icon, Screen, TextField } from "../components"
import { color, spacing } from "../theme"
import { Toggle } from "react-powerplug"
import { useStores } from "../models/root-store"

export interface LoginProps extends NavigationInjectedProps<{}> {}

export const LoginScreen: React.FunctionComponent<LoginProps> = observer(props => {
  const [username, setUserName] = useState<string>(__DEV__ ? 'meirav' : '')
  const [password, setPassword] = useState<string>(__DEV__ ? '123456' : '')

  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagesTabList'), [props.navigation])

  const { profileModel: { login } } = useStores()
  const loginSequence = async () => {
    const loginReq = await login(username, password)
    if (loginReq.ok) {
      goToNextPage()
    }
  }

  const renderTextFields = (): React.ReactElement => {
    return (
      <View>
        <TextField
          value={username}
          inputStyle={{ paddingHorizontal: 5 }}
          onChangeText={(val) => setUserName(val)}
          label={"שם משתמש.ת"}
        />
        {/* <TextField label={store.packagesStore.packages[0].name} /> */}
        <TextField
          inputStyle={{ paddingHorizontal: 5 }}
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
          value={password}
          style={styles.passwordTextField}
          label={"סיסמה"} />
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

  return useObserver(() => (
    <View style={styles.container}>
      <Screen preset="scroll" backgroundColor={color.palette.white}>
        <Icon style={styles.icon} icon="loginLogo" />
        {renderTextFields()}
        {renderCheckbox()}
        <Button text={'כניסה'} onPress={() => loginSequence()}/>
      </Screen>
    </View>
  ))
})

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
