import React, { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationActions, NavigationInjectedProps } from 'react-navigation';
import { Toggle } from 'react-powerplug';
import { color, spacing } from '../theme';
import PromiseTimeout from '../services/timers/promise-timeout.service';
import { Button, Checkbox, Screen, Icon, TextField } from '../components';
import ErrorModal from '../components/modal-error/error.modal';
import LoadingModal from '../components/loading/loading.modal';
import { useStores } from "../models/root-store";

export interface LoginProps extends NavigationInjectedProps<{}> {}

const ERROR_MESSAGE = 'אירעה שגיאה.\nאנה נסה שוב מאוחר יותר.';
export const LoginScreen: React.FunctionComponent<LoginProps> = observer(() => {
  const { navigationStore, profileModel: { login, token, autoLogin, silentLogin } } = useStores();

  const [username, setUserName] = React.useState<string>(__DEV__ ? 'haver3' : '');
  const [password, setPassword] = React.useState<string>(__DEV__ ? '0545718472' : '');
  const [isErrorModalDisplayed, setErrorModal] = React.useState<boolean>(false);
  const [loginError, setLoginError] = React.useState<boolean>(false);
  const [isLoadingModalDisplayed, setLoadingModal] = React.useState<boolean>(false);
  const [savePass, setSavePass] = React.useState<boolean>(autoLogin);
  const [errorMessage, setErrorMessage] = React.useState<string>(undefined);

  useEffect(() => {
    if (autoLogin && token) {
      displayLoadingModal(true);
      silentLogin().then(response => {
        handleLoginRequest(response);
      });
    }
  }, []);

  const displayErrorModal = () => {
    setErrorMessage(ERROR_MESSAGE);
    setErrorModal(!isErrorModalDisplayed);
  };

  const displayLoadingModal = (show: boolean) => setLoadingModal(show);

  const loginSequence = async () => {
    displayLoadingModal(true);

    const loginRequest = login(username, password, savePass);
    const runLoginRequest = PromiseTimeout(10000, loginRequest);

    try {
      const loginResponse = await runLoginRequest;
      displayLoadingModal(false);
      handleLoginRequest(loginResponse);
    } catch (error) {
      console.log(`error occured: ${error}`);
      displayLoadingModal(false);
      setTimeout(() => {
        displayErrorModal();
      }, 1000);
    }
  };

  const handleLoginRequest = (loginResponse: any): void => {
	if (loginResponse.ok) {
      displayLoadingModal(false);
      navigationStore.dispatch(NavigationActions.navigate({ routeName: 'packagesTabList' }));
    } else if (loginResponse.status === 401) {
        setLoginError(true);
        setTimeout(() => {
          setLoginError(false);
        }, 4000);
      } else {
        displayErrorModal();
      }
  };

  const renderErrorLogin = (): React.ReactElement => loginError && (
      <View style={styles.errorMessage}>
        <Text style={styles.loginError}>שם משתמש או סיסמה לא נכונים</Text>
      </View>);

  const renderTextFields = (): React.ReactElement => (
      <View>
        <TextField
          value={username}
          inputStyle={{ paddingHorizontal: 5 }}
          onChangeText={(val) => setUserName(val)}
          label="שם משתמש.ת"
        />
        <TextField
          inputStyle={{ paddingHorizontal: 5 }}
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
          value={password}
          style={styles.passwordTextField}
          label="סיסמה"
        />
      </View>);

  const renderCheckbox = (): React.ReactElement => (
      <View style={styles.rememberMeContainer}>
        <Toggle initial={savePass}>
          {({ on, toggle }) => {
            setSavePass(on);
            return (<Checkbox value={on} onToggle={toggle} text='זכור אותי' />);
          }}
        </Toggle>
      </View>);

  const renderErrorModal = (): React.ReactElement => <ErrorModal visible={isErrorModalDisplayed} message={errorMessage} handelClose={displayErrorModal}/>;

  const renderLoadingModal = (): React.ReactElement => <LoadingModal visible={isLoadingModalDisplayed} />;

  return (
    <View style={styles.container}>
      <Screen preset='scroll' backgroundColor={color.palette.white}>
        <Icon style={styles.loginLogo} icon='loginLogo' />
        {renderErrorLogin()}
        {renderTextFields()}
        {renderCheckbox()}
        {renderLoadingModal()}
        {renderErrorModal()}
        <Button text="כניסה" onPress={loginSequence}/>
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
  },
  errorMessage: {
	backgroundColor: 'rgb(253, 228, 227)',
	height: 50,
	display: 'flex',
	alignItems: "center",
	justifyContent: "center",
	marginBottom: 30,
	borderRadius: 3
  },
  loginError: {
	color: 'rgb(198, 44, 44)',
	fontSize: 18
  }
});
