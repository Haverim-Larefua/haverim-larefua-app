import * as React from "react"
import { StyleSheet, View} from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Icon, Screen, TextField} from "../components"
import { spacing } from "../theme";

export interface LoginProps extends NavigationInjectedProps<{}> {}

export const LoginScreen: React.FunctionComponent<LoginProps> = props => {
  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagesList'), [props.navigation])
  return (
    <View style={{ flex: 1 }}>
      <Screen style={styles.container} preset="scroll" backgroundColor={'#fff'}>
        <Icon style={styles.icon} icon="loginLogo" />
        <TextField label={"שם משתמש.ת"} />
        <TextField label={"סיסמה"} />
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
    marginTop: 75
  }
});
