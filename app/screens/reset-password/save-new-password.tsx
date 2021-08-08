import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationActions, NavigationInjectedProps } from "react-navigation";
import { Button, Icon, Screen, Text, TextField } from "../../components";
import { useStores } from "../../models/root-store";
import PromiseTimeout from "../../services/timers/promise-timeout.service";
import { color, spacing } from "../../theme";

export interface SaveNewPasswordProps extends NavigationInjectedProps<{}> { }


export const SaveNewPasswordScreen: React.FunctionComponent<SaveNewPasswordProps> = observer(() => {
    const ERROR_MESSAGE = 'אירעה שגיאה.\nאנה נסה שוב מאוחר יותר.';

    const { navigationStore, profileModel: { resetPassword } } = useStores();
    const [password, setPassword] = React.useState<string>();
    const [confirmPassword, setConfirmPassword] = React.useState<string>();
    const [confirmError, setConfirmError] = React.useState<string>();
    const [passwordError, setPasswordError] = React.useState<string>();
    const [isLoadingModalDisplayed, setLoadingModal] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>(undefined);
    const [isErrorModalDisplayed, setErrorModal] = React.useState<boolean>(false);

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

        if(!strongRegex.test(password)) {
            setPasswordError("סיסמא לא תקינה");
            return;
        }

        if (!confirmPassword || confirmPassword !== password) {
            setConfirmError("אין התאמה");
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
                label="סיסמא חדשה"
            />
            <Text preset="secondary" text="הסיסמא חיבת להכיל למעלה מ 6 תוים ולכלול אותיות ומספרים"></Text>
            {!!passwordError && (
                <Text style={{ color: 'red' }}>
                    {passwordError}
                </Text>
            )}
            <TextField
                secureTextEntry
                onChangeText={(val) => setConfirmPassword(val)}
                value={confirmPassword}
                style={styles.passwordTextField}
                label="הקלידו שוב את הסיסמא"
            />
            {!!confirmError && (
                <Text style={{ color: 'red' }}>
                    {confirmError}
                </Text>
            )}
        </View>);

    return (
        <View style={styles.container}>
            <Screen preset='scroll' backgroundColor={color.palette.white}>
                <Icon style={styles.logo} icon='loginLogo' />
                <Text preset={'bold'} style={styles.title} text={'בחירת סיסמא חדשה'} />
                {renderPasswordFields()}
                <Button text="שמירת סיסמא" style={styles.button} onPress={updatePassword} />
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
        marginTop: 10
    },
    button: {
        marginTop: 20,
    }
  
});