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
    const ERROR_MESSAGE = 'אירעה שגיאה.\nאנה נסה שוב מאוחר יותר.';

    const { navigationStore, profileModel: { login } } = useStores();
    const [password, setPassword] = React.useState<string>();
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

        const resetPasswordRequest = login("aa", password, false);
        const runResetPasswordRequest = PromiseTimeout(10000, resetPasswordRequest);

        try {
            const response = await runResetPasswordRequest;
            displayLoadingModal(false);
            navigationStore.dispatch(NavigationActions.navigate({ routeName: 'saveNewPassword' }));
        } catch (error) {
            console.log(`error occured: ${error}`);
            displayLoadingModal(false);
            setTimeout(() => {
                displayErrorModal();
            }, 1000);
        }
    };


    return (
        <View style={styles.container}>
            <Screen preset='scroll' backgroundColor={color.palette.white}>
                <Icon style={styles.logo} icon='loginLogo' />
                <Text preset={'headerCenter'} text={'איפוס סיסמא'} />
                <Text preset={'secondaryCenter'} text={'נא להקיש את הקוד בן 6 ספרות \nשנשלח אליך במסרון'} />
                <TextField />
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
    }
});