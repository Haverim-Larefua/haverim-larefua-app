import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Checkbox, Screen, Icon, TextField, Text } from '../../components';
import { NavigationActions, NavigationInjectedProps } from "react-navigation";
import { color, spacing } from "../../theme";
import { StyleSheet, View } from "react-native";
import PromiseTimeout from "../../services/timers/promise-timeout.service";
import { useStores } from "../../models/root-store";

export interface ResetPasswordFirstLoginProps extends NavigationInjectedProps<{}> { }

export const ResetPasswordFirstLoginScreen: React.FunctionComponent<ResetPasswordFirstLoginProps> = observer(() => {
  const ERROR_MESSAGE = 'אירעה שגיאה.\nאנא נסה.י שוב מאוחר יותר.';

  const { navigationStore, profileModel: { resetPassword } } = useStores();
  const [password, setPassword] = React.useState<string>();
  const [isLoadingModalDisplayed, setLoadingModal] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>(undefined);
  const [isErrorModalDisplayed, setErrorModal] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<string>();

  const displayErrorModal = () => {
    setErrorMessage(ERROR_MESSAGE);
    setErrorModal(!isErrorModalDisplayed);
  };

  const displayLoadingModal = (show: boolean) => setLoadingModal(show);

  const updatePassword = async () => {

    if (!password || password.trim() === "") {
      setPasswordError("שדה חובה");
      return;
    }

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{6,})", 'i');

    if (!strongRegex.test(password)) {
      setPasswordError("סיסמא לא תקינה");
      return;
    }

    displayLoadingModal(true);

    const resetPasswordRequest = resetPassword(password);
    const runResetPasswordRequest = PromiseTimeout(10000, resetPasswordRequest);

    try {
      const response = await runResetPasswordRequest;
      displayLoadingModal(false);
      navigationStore.dispatch(NavigationActions.navigate({ routeName: 'updatePasswordSucceeded' }));
    } catch (error) {
      console.log(`error occured: ${error}`);
      displayLoadingModal(false);
      setTimeout(() => {
        displayErrorModal();
      }, 1000);
    }
  };

  const renderPasswordFields = (): React.ReactElement => (
    <View>
      <TextField
        inputStyle={{ paddingHorizontal: 5 }}
        secureTextEntry
        onChangeText={(val) => setPassword(val)}
        value={password}
        style={styles.passwordTextField}
        label="סיסמה"
      />
      <Text text="הסיסמא חיבת להכיל למעלה מ 6 תוים ולכלול אותיות ומספרים" style={styles.passwordWarningTextField}></Text>
      {!!passwordError && (
        <Text style={{ color: 'red' }}>
          {passwordError}
        </Text>
      )}
    </View>);

  return (
    <View style={styles.container}>
      <Screen preset='scroll' backgroundColor={color.palette.white}>
        <Icon style={styles.loginLogo} icon='loginLogo' />
        <Text preset={'bold'} style={styles.welcomeText} text={'ברוכים הבאים'} />
        <Text text={'תודה שנרשמתם לשליחים לרפואה.'} style={styles.ThanksText} />
        <Text text={'על מנת להמשיך, אנא בחרו סיסמא חדשה.'} style={styles.ThanksText} />
        {renderPasswordFields()}
        <Button text="עדכון סיסמא" onPress={updatePassword} />
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
  passwordTextField: {
    marginTop: 14
  },
  passwordWarningTextField: {
    marginBottom: 22
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24
  },
  ThanksText: {
    textAlign: "center",
  }

});

