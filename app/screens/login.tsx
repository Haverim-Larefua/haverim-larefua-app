import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View, Alert } from 'react-native';
import { NavigationActions, NavigationInjectedProps } from 'react-navigation';
import { Button, Checkbox, Icon, Screen, TextField, Text } from '../components';
import { color, spacing } from '../theme';
import { Toggle } from 'react-powerplug';
import { useStores } from '../models/root-store';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { TouchableOpacity,  } from 'react-native';


export interface LoginProps extends NavigationInjectedProps<{}> {}

export const LoginScreen: React.FunctionComponent<LoginProps> = observer(props => {

  const [username, setUserName] = useState<string>(__DEV__ ? 'dr7774-9' : '');
  const [password, setPassword] = useState<string>(__DEV__ ? '0523057774' : '');
  const { navigationStore, profileModel: { login } } = useStores();
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback((/*errorMsg: string*/) => {
    setVisible(!visible);
  }, [visible]);

  const loginSequence = async () => {
	const loginReq = await login(username, password);

    if (loginReq.ok) {
      // both methods are viable
	  // props.navigation.navigate('packagesTabList')
	  console.log('login success');
      navigationStore.dispatch(NavigationActions.navigate({ routeName: 'packagesTabList' }))
    } else {
		let errorMsg = undefined;
		if(loginReq.status === 401 ) {
			errorMsg = 'The username or password is incorrect';
		} else {
			errorMsg = 'An error occurred when logging in please try again later';
		}
		//console.log(`login failed: ${JSON.stringify(loginReq)}`);
		toggleAlert(/*errorMsg*/);
    }
  }

  const renderTextFields = (): React.ReactElement => {
    return (
      <View>
        <TextField
          value={username}
          inputStyle={{ paddingHorizontal: 5 }}
          onChangeText={(val) => setUserName(val)}
          label={'שם משתמש.ת'}
        />
        <TextField
          inputStyle={{ paddingHorizontal: 5 }}
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
          value={password}
          style={styles.passwordTextField}
          label={'סיסמה'} />
      </View>
    )
  }

  const renderCheckbox = (): React.ReactElement => {
    return (
      <View style={styles.rememberMeContainer}>
        <Toggle initial={false}>
          {({ on, toggle }) => <Checkbox value={on} onToggle={toggle} text='זכור אותי' />}
        </Toggle>
      </View>
    )
  }

	const renderLoginModal = (): React.ReactElement => {
		return (
			<View>
				{/* <TouchableOpacity onPress={toggleAlert}>
					<Text>OK</Text>
				</TouchableOpacity> */}
				<FancyAlert visible={visible} 
							icon={<View style={styles.loginModalIcon}><Text style={{color : color.palette.white}}>X</Text></View>}
							style={{ backgroundColor: color.palette.white }}
							onRequestClose={() => toggleAlert()}
				>
					<Text style={styles.loginModalMsg}>An error occurred when logging in please try again later</Text>
					{/* <TouchableHighlight
						style={styles.loginModalButton}
						onPress={() => {
							toggleAlert();
						}}
						>
						<Text>OK</Text>
					</TouchableHighlight> */}
					<TouchableOpacity onPress={toggleAlert}>
					<Text>OK</Text>
				</TouchableOpacity>
				</FancyAlert>
			</View>
		);
	}

  return (
    <View style={styles.container}>
      <Screen preset='scroll' backgroundColor={color.palette.white}>
        <Icon style={styles.loginLogo} icon='loginLogo' />
        {renderTextFields()}
		{renderCheckbox()}
		{renderLoginModal()}
        <Button text={'כניסה'} onPress={loginSequence}/>
      </Screen>
    </View>
  )
})

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
  loginModalIcon: {
    flex: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'red',
	borderRadius: 50,
	width: '100%'
  },
  loginModalMsg: {
	color: color.palette.black,
	// flex: 1,
	// display: 'flex',
	// justifyContent: 'center',
	//marginTop: -16, marginBottom: 32
  },
  loginModalButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 10,
	elevation: 2,
	width: '100%'

  }
});