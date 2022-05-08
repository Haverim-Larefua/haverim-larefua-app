import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationActions, NavigationInjectedProps } from "react-navigation";
import { Button, Icon, Screen, Text } from "../../components";
import { useStores } from "../../models/root-store";
import { color, spacing } from "../../theme";

export interface UpdatePasswordSucceededScreenProps extends NavigationInjectedProps<{}> {}


export const UpdatePasswordSucceededScreen: React.FunctionComponent<UpdatePasswordSucceededScreenProps> = observer(() => {

const { navigationStore } = useStores();

  const navigate = () => {
    navigationStore.dispatch(NavigationActions.navigate({ routeName: 'login' }));
  }

    return (
        <View style={styles.container}>
          <Screen preset='scroll' backgroundColor={color.palette.white}>
            <Icon style={styles.loginLogo} icon='loginLogo' />
            <Icon style={styles.fiireworks} icon='fiireworks' />
            <Text preset={'bold'} style={styles.updateSucceeded}  text={'סיסמתכם עודכנה בהצלחה'}/>
            <Text style={styles.updateSucceededRedirectMessage} text={'כעת ניתן להתחבר עם הסיסמא החדשה'}/>
            <Button text="חזור למסך הכניסה"  onPress={navigate}/>
          </Screen>
        </View>
      );

});

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
    paddingHorizontal: spacing.regularPadding
  },
  loginLogo: {
    alignSelf: 'center',
    width: 97,
    height: 66,
    marginBottom: 65,
    marginTop: 75
  },
  fiireworks: {
    alignSelf: 'center',
    width: 186,
    height: 186,
    marginBottom: 45,
  },
  updateSucceeded: {
    textAlign: "center",
    fontSize: 21,
  },
  updateSucceededRedirectMessage: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 35,
  },
 
});
