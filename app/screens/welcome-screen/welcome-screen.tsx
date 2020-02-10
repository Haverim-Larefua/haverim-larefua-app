import * as React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
const bowserLogo = require("./bowser.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing.halfPadding,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing.bigSpacing,
  paddingBottom: 19,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing.regularPadding,
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing.regularPadding,
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing.halfPadding,
  paddingHorizontal: spacing.halfPadding,
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing.halfPadding,
  paddingHorizontal: spacing.halfPadding,
}

export interface WelcomeScreenProps extends NavigationInjectedProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  const nextScreen = React.useMemo(() => () => props.navigation.navigate("demo"), [
    props.navigation,
  ])

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Your new app, " />
          <Text style={ALMOST} text="almost" />
          <Text style={TITLE} text="!" />
        </Text>
        <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" />
        <Image source={bowserLogo} style={BOWSER} />
        <Text style={CONTENT}>
          This probably isn't what your app is going to look like. Unless your designer handed you
          this screen and, in that case, congrats! You're ready to ship.
        </Text>
        <Text style={CONTENT}>
          For everyone else, this is where you'll see a live preview of your fully functioning app
          using Ignite.
        </Text>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="welcomeScreen.continue"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
