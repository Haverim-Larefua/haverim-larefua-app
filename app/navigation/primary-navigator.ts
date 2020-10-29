import createNativeStackNavigator from "react-native-screens/createNativeStackNavigator"
import {
  LoginScreen,
  PackageDetailsScreen,
  PackageDeliveryConfirmationScreen,
  PackagesListTabs,
  PackageProblemScreen
} from "../screens"

export const PrimaryNavigator = createNativeStackNavigator(
  {
    // welcome: { screen: WelcomeScreen },
    // demo: { screen: DemoScreen },
    login: { screen: LoginScreen },
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
