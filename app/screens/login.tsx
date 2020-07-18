import React, { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';
import { NavigationActions, NavigationInjectedProps } from 'react-navigation';
import { Toggle } from 'react-powerplug';
import { color, spacing } from '../theme';
import { useStores } from '../models/root-store';
import PromiseTimeout from '../services/timers/promise-timeout.service';
import { Button, Checkbox, Screen, Icon, TextField } from '../components';
import ErrorModal from '../components/modal-error/error.modal';
import LoadingModal from '../components/loading/loading.modal';

export interface LoginProps extends NavigationInjectedProps<{}> {};

export const LoginScreen: React.FunctionComponent<LoginProps> = observer(() => {
  const { navigationStore, profileModel, profileModel: { login, token, autoLogin, silentLogin } } = useStores();

  const [username, setUserName] = React.useState<string>(__DEV__ ? 'haver4' : '');
  const [password, setPassword] = React.useState<string>(__DEV__ ? '0545606871' : '');
  const [isErrorModalDisplayed, setErrorModalState] = React.useState<boolean>(false);
  const [isLoadingModalDisplayed, setLoadingModalState] = React.useState<boolean>(false);
  const [savePass, setSavePass] = React.useState<boolean>(autoLogin);
  const [errorMessage, setErrorMessage] = React.useState<string>(undefined);

  useEffect(() => {
    if (autoLogin && token) {
      displayLoadingModal(true);
      silentLogin().then(r => {
        handleLoginRequest(r);
      });
    }
  }, []);

  const displayErrorModal = React.useCallback(() => {
    setErrorModalState(!isErrorModalDisplayed);
  }, [isErrorModalDisplayed]);

  const displayLoadingModal = (show: boolean) => {
    setLoadingModalState(show);
  };

 	const loginSequence = async () => {
    displayLoadingModal(true);

    const loginRequest = login(username, password, savePass);
    const runLoginRequest = PromiseTimeout(10000, loginRequest);

    try {
      const loginResponse = await runLoginRequest;
      displayLoadingModal(false);
      handleLoginRequest(loginResponse);
    } catch (error) {
      console.log(`error: ${error}`);
      displayLoadingModal(false);
      setErrorMessage('An error occurred when logging, please try again later...');
      displayErrorModal();
    }
  };

  const handleLoginRequest = (loginResponse: any): void => {
    console.log('login success', loginResponse);
    if (loginResponse.ok) {
      console.log('login success');
      displayLoadingModal(false);
      navigationStore.dispatch(NavigationActions.navigate({ routeName: 'packagesTabList' }));
    } else {
      if (loginResponse.status === 401) {
        setErrorMessage('The username or password is incorrect');
      } else {
        setErrorMessage('An error occurred when logging, please try again later...');
      }
      console.log(errorMessage);
      displayErrorModal();
    }
  };

  const renderTextFields = (): React.ReactElement => {
    return (
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
  };

  const renderCheckbox = (): React.ReactElement => {
    return (
      <View style={styles.rememberMeContainer}>
        <Toggle initial={savePass}>
          {({ on, toggle }) => {
          	setSavePass(on);
            return (<Checkbox value={on} onToggle={toggle} text='זכור אותי' />);
          }}
        </Toggle>
      </View>);
  };

  const renderErrorModal = (): React.ReactElement => {
    return (
      <ErrorModal visible={isErrorModalDisplayed} message={errorMessage} handelClose={displayErrorModal}/>
    );
  };

  const renderLoadingModal = (): React.ReactElement => {
    return (
      <LoadingModal visible={isLoadingModalDisplayed} />
    );
  };

  return (
    <View style={styles.container}>
      <Screen preset='scroll' backgroundColor={color.palette.white}>
        <Icon style={styles.loginLogo} icon='loginLogo' />
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
  }
});
