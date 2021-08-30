import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationActions, NavigationInjectedProps } from "react-navigation";
import { Button, Icon, Screen, Text, TextField } from "../../components";
import { useStores } from "../../models/root-store";
import PromiseTimeout from "../../services/timers/promise-timeout.service";
import { color, spacing } from "../../theme";

export interface ResetPasswordProps extends NavigationInjectedProps<{}> { }


export const ResetPasswordScreen: React.FunctionComponent<ResetPasswordProps> = observer(() => {
    const ERROR_MESSAGE = 'אירעה שגיאה.\nאנא נסה.י שוב מאוחר יותר.';

    const { navigationStore, profileModel: { login, profile: {
       username
      } } } = useStores();
    const [password, setPassword] = React.useState<string>();
    const [loginError, setLoginError] = React.useState<boolean>(false);
    const [isLoadingModalDisplayed, setLoadingModal] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>(undefined);
    const [isErrorModalDisplayed, setErrorModal] = React.useState<boolean>(false);

    const displayErrorModal = () => {
        setErrorMessage(ERROR_MESSAGE);
        setErrorModal(!isErrorModalDisplayed);
    };

    const displayLoadingModal = (show: boolean) => setLoadingModal(show);

    const sendAgain = () => {
        navigationStore.dispatch(NavigationActions.navigate({ routeName: 'forgotPassword' }));
    }

    const sendPassword = async () => {
        displayLoadingModal(true);
        const resetPasswordRequest = login(username, password, false);
        const runResetPasswordRequest = PromiseTimeout(10000, resetPasswordRequest);

        try {
            const response = await runResetPasswordRequest;
            displayLoadingModal(false);
            if(response.ok) {
               navigationStore.dispatch(NavigationActions.navigate({ routeName: 'saveNewPassword' }));
            }
            else {
                setLoginError(true);
                setTimeout(() => {
                  setLoginError(false);
                }, 4000);
            }
        
        } catch (error) {
            console.log(`error occured: ${error}`);
            displayLoadingModal(false);
            setTimeout(() => {
                displayErrorModal();
            }, 1000);
        }
    };

    const renderErrorLogin = (): React.ReactElement => loginError && (
        <View style={styles.errorMessage}>
          <Text style={styles.loginError}>קוד לא תקין - נסו שנית</Text>
        </View>);


    return (
        <View style={styles.container}>
            <Screen preset='scroll' backgroundColor={color.palette.white}>
                <Icon style={styles.logo} icon='loginLogo' />
                {renderErrorLogin()}
                <Text preset={'headerCenter'} text={'איפוס סיסמא'} />
                <Text preset={'secondaryCenter'} text={'נא להקיש את הקוד בן 6 ספרות \nשנשלח אליך במסרון'} />
                <TextField  onChangeText={(val) => setPassword(val)}/>
                <Button style={styles.sendButton} text="שליחה" onPress={sendPassword} />
                <Text preset={'secondaryCenter'} text={'לא קיבלתם קוד?'} />
                <Text preset={'secondaryCenter'} style={styles.sendAgain} text={'לחצו לשליחה חוזרת'} onPress={sendAgain} />
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
    logo: {
        alignSelf: 'center',
        width: 97,
        height: 66,
        marginBottom: 65,
        marginTop: 75
    },
    title: {
        textAlign: "center",
        fontSize: 24
    },
    passwordTextField: {
        marginTop: 14
    },
    sendAgain: {
        fontSize: 16,
        color: "#1d1d1f",
        textAlign: "center",
        textDecorationLine: "underline",
    },
    sendButton: {
        marginTop: 20,
        marginBottom: 20,
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