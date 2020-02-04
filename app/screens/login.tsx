import * as React from "react"
import { observer, useObserver } from 'mobx-react-lite'
import { firebase } from '@react-native-firebase/messaging';

import { StyleSheet, View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Button, Checkbox, Icon, Screen, TextField } from "../components"
import { color, spacing } from "../theme"
import { Toggle } from "react-powerplug"
import { useStores } from "../models/root-store"
import reactotron from "reactotron-react-native"

export interface LoginProps extends NavigationInjectedProps<{}> {}

export const LoginScreen: React.FunctionComponent<LoginProps> = observer(props => {
  const fcm = async () => {
    await firebase.messaging().registerForRemoteNotifications();
    const fcmToken = await firebase.messaging().getToken();
    const uid = firebase.auth().currentUser.uid;
    reactotron.log(fcmToken)
    reactotron.log(uid)
  }

  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagesList'), [props.navigation])
  // todo: delete store integration example after implementation
  const store = useStores()
  const changeStoreExample = () => store.packagesStore.packages[0].setName(new Date().toLocaleTimeString())
  reactotron.log(store)
  const renderLoginIcon = (): React.ReactElement => {
    return <Icon style={styles.icon} icon="loginLogo" />
  }
  const renderTextFields = (): React.ReactElement => {
    return (
      <View>
        <TextField label={"שם משתמש.ת"} />
        {/* <TextField label={store.packagesStore.packages[0].name} /> */}
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
    return <Button text={'כניסה'} onPress={async () => await fcm()}/>
  }
  return useObserver(() => (
    <View style={styles.container}>
      <Screen preset="scroll" backgroundColor={color.palette.white}>
        {renderLoginIcon()}
        {renderTextFields()}
        {renderCheckbox()}
        {renderLoginButton()}
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
