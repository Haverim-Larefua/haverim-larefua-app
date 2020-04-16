import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View ,TouchableOpacity } from 'react-native';
import { NavigationActions, NavigationInjectedProps } from 'react-navigation';
import { Button, Checkbox, Screen, Icon, TextField, Text } from '../components';
import { color, spacing } from '../theme';
import { Toggle } from 'react-powerplug';
import { useStores } from '../models/root-store';
import { FancyAlert, LoadingIndicator } from 'react-native-expo-fancy-alerts';
import VectorIcon from 'react-native-vector-icons/FontAwesome';
import PromiseTimeout from '../services/timers/promise-timeout.service';


export interface LoginProps extends NavigationInjectedProps<{}> {}

export const LoginScreen: React.FunctionComponent<LoginProps> = observer(props => {

	const [username, setUserName] = React.useState<string>(__DEV__ ? 'dr7774-9-2' : '');
	const [password, setPassword] = React.useState<string>(__DEV__ ? '0523057774' : '');
	const { navigationStore, profileModel: { login } } = useStores();

	const [isErrorModalDisplayed, setErrorModalState] = React.useState<boolean>(false);
	const toggleErrorModal = React.useCallback(() => {
		setErrorModalState(!isErrorModalDisplayed);
	}, [isErrorModalDisplayed]);

	const [isSpinnerModalDisplayed, setSpinnerModalState] = React.useState<boolean>(false);
	const displaySpinnerModal = (value:boolean) => {
		setSpinnerModalState(value);
	}

 	const loginSequence = async () => {
		displaySpinnerModal(true);
		
		const loginRequest = login(username, password);
		const runLoginRequest = PromiseTimeout(100, loginRequest);

		try {
			const loginResponse = await runLoginRequest;
			displaySpinnerModal(false);
			handleLoginRequest(loginResponse);
		} catch (error) {
			console.log(`error: ${error}`);
			displaySpinnerModal(false);
			toggleErrorModal();
		}
	}

	const handleLoginRequest = (loginResponse: any) : void => {
		if (loginResponse.ok) {
			console.log('login success');
			navigationStore.dispatch(NavigationActions.navigate({ routeName: 'packagesTabList' }))
		} else {
			let errorMsg = undefined;
			if(loginResponse.status === 401 ) {
				errorMsg = 'The username or password is incorrect';
			} else {
				errorMsg = 'An error occurred when logging, please try again later';
			}
			console.log(errorMsg);
			toggleErrorModal();
		}
	};

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
					label={'סיסמה'}
				/>
			</View>);
	}

	const renderCheckbox = (): React.ReactElement => {
		return (
			<View style={styles.rememberMeContainer}>
				<Toggle initial={false}>
				{({ on, toggle }) => <Checkbox value={on} onToggle={toggle} text='זכור אותי' />}
				</Toggle>
			</View>);
	}

	const renderErrorModal = (): React.ReactElement => {
		return (
			<View>
				<FancyAlert visible={isErrorModalDisplayed} 
							icon = {
								<View style={styles.loginModalIcon}>
									<VectorIcon name="close" size={20} color='white' />
								</View>
							}
							style={{ backgroundColor: color.palette.white }}
							onRequestClose={() => /*toggleErrorModal()*/ console.log('is it in use??')}
				>
					<Text style={styles.loginModalMsg}>An error occurred when logging, please try again later...</Text>
					<TouchableOpacity style={styles.modalButton}
									onPress={toggleErrorModal}>
						<Text style={{color : color.palette.white, textAlign: 'center'}}>OK</Text>
					</TouchableOpacity>
				</FancyAlert>
			</View>
		);
	}

	const renderSpinnerModal  = (): React.ReactElement => {
		return (
			<LoadingIndicator visible={isSpinnerModalDisplayed} />
		);
	}

	return (
		<View style={styles.container}>
			<Screen preset='scroll' backgroundColor={color.palette.white}>
				<Icon style={styles.loginLogo} icon='loginLogo' />
				{renderTextFields()}
				{renderCheckbox()}
				{renderSpinnerModal()}
				{renderErrorModal()}
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
		textAlign: 'center',
		marginTop: -15,
		marginBottom: 15
	},
	modalButton: {
		backgroundColor: 'red',
		borderRadius: 50,
		padding: 10,
		marginBottom: 8,
		width: '100%'
	}
});