import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';
import { NavigationActions, NavigationInjectedProps } from 'react-navigation';
import { color, spacing } from '../theme';
import { Toggle } from 'react-powerplug';
import { useStores } from '../models/root-store';
import PromiseTimeout from '../services/timers/promise-timeout.service';
import { Button, Checkbox, Screen, Icon, TextField } from '../components';
import ErrorModal from '../components/modal-error/error.modal';
import LoadingModal from '../components/loading/loading.modal';

export interface LoginProps extends NavigationInjectedProps<{}> {}


export const LoginScreen: React.FunctionComponent<LoginProps> = observer(() => {

	const [username, setUserName] = React.useState<string>(__DEV__ ? 'dr7774-9_2' : '');
	const [password, setPassword] = React.useState<string>(__DEV__ ? '0523057774' : '');
	const { navigationStore, profileModel: { login } } = useStores();

	const [isErrorModalDisplayed, setErrorModalState] = React.useState<boolean>(false);
	const displayErrorModal = React.useCallback(() => {
		setErrorModalState(!isErrorModalDisplayed);
	}, [isErrorModalDisplayed]);

	const [isLoadingModalDisplayed, setLoadingModalState] = React.useState<boolean>(false);
	const displayLoadingModal = (show: boolean) => {
		setLoadingModalState(show);
	}

	let errorMsg = undefined;

 	const loginSequence = async () => {
		displayLoadingModal(true);
		
		const loginRequest = login(username, password);
		const runLoginRequest = PromiseTimeout(10000, loginRequest);

		try {
			const loginResponse = await runLoginRequest;
			displayLoadingModal(false);
			handleLoginRequest(loginResponse);
		} catch (error) {
			console.log(`error: ${error}`);
			displayLoadingModal(false);
			errorMsg = 'An error occurred when logging, please try again later...';
			displayErrorModal();
		}
	}

	const handleLoginRequest = (loginResponse: any) : void => {
		if (loginResponse.ok) {
			console.log('login success');
			navigationStore.dispatch(NavigationActions.navigate({ routeName: 'packagesTabList' }))
		} else {
			if(loginResponse.status === 401 ) {
				errorMsg = 'The username or password is incorrect';
			} else {
				errorMsg = 'An error occurred when logging, please try again later...';
			}
			console.log(errorMsg);
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
			<ErrorModal visible={isErrorModalDisplayed} message={errorMsg} handelClose={displayErrorModal}/>
		);
	}

	const renderLoadingModal = (): React.ReactElement => {
		return (
			<LoadingModal visible={isLoadingModalDisplayed} />
		);
	}

	return (
		<View style={styles.container}>
			<Screen preset='scroll' backgroundColor={color.palette.white}>
				<Icon style={styles.loginLogo} icon='loginLogo' />
				{renderTextFields()}
				{renderCheckbox()}
				{renderLoadingModal()}
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
	}
});