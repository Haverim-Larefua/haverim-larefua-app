import createNativeStackNavigator from "react-native-screens/createNativeStackNavigator"
import {
  LoginScreen,
  PackageDetailsScreen,
  PackageDeliveryConfirmationScreen,
  PackagesListTabs,
  PackageProblemScreen
} from "../screens"
import { ForgotPasswordScreen } from "../screens/reset-password/forgot-password"
import { ResetPasswordScreen } from "../screens/reset-password/reset-password"
import { ResetPasswordFirstLoginScreen } from "../screens/reset-password/reset-password-first-login"
import { SaveNewPasswordScreen } from "../screens/reset-password/save-new-password"
import { UpdatePasswordSucceededScreen } from "../screens/reset-password/update-password-succeeded"

export const PrimaryNavigator = createNativeStackNavigator(
  {
    // welcome: { screen: WelcomeScreen },
    // demo: { screen: DemoScreen },
    login: { screen: LoginScreen },
    forgotPassword: { screen: ForgotPasswordScreen },
    resetPassword: { screen: ResetPasswordScreen },
    saveNewPasswordPassword: { screen: SaveNewPasswordScreen },
    resetPasswordFirstLogin: { screen: ResetPasswordFirstLoginScreen },
    updatePasswordSucceeded: { screen: UpdatePasswordSucceededScreen },
    // packagesList: { screen: PackagesListScreen },
    packagesTabList: { screen: PackagesListTabs },
    packageDetails: { screen: PackageDetailsScreen },
    packageProblem: { screen: PackageProblemScreen },
    deliveryConfirmation: { screen: PackageDeliveryConfirmationScreen }
  },
  {
    headerMode: "none",
  },
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["packagesTabList"]
