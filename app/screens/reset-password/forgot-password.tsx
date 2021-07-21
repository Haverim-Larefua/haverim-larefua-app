import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationActions, NavigationInjectedProps } from "react-navigation";
import { Button, Icon, Screen, Text, TextField } from "../../components";
import { useStores } from "../../models/root-store";
import PromiseTimeout from "../../services/timers/promise-timeout.service";
import { color, spacing } from "../../theme";

export interface ForgotPasswordProps extends NavigationInjectedProps<{}> { }


export const ForgotPasswordScreen: React.FunctionComponent<ForgotPasswordProps> = observer(() => {
    const ERROR_MESSAGE = 'אירעה שגיאה.\nאנה נסה שוב מאוחר יותר.';

    const { navigationStore, profileModel: { forgotPassword } } = useStores();
    const [phoneNumber, setPhoneNumber] = React.useState<string>();
    const [isLoadingModalDisplayed, setLoadingModal] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>(undefined);
    const [isErrorModalDisplayed, setErrorModal] = React.useState<boolean>(false);

    const displayErrorModal = () => {
        setErrorMessage(ERROR_MESSAGE);
        setErrorModal(!isErrorModalDisplayed);
    };

    const displayLoadingModal = (show: boolean) => setLoadingModal(show);


    const sendSMS = async () => {
        displayLoadingModal(true);

        const forgotPasswordRequest = forgotPassword(phoneNumber);
        const runForgotPasswordRequest = PromiseTimeout(10000, forgotPasswordRequest);

        try {
            // const response = await runForgotPasswordRequest;
            // displayLoadingModal(false);
            // if (response.ok) {
                navigationStore.dispatch(NavigationActions.navigate({ routeName: 'resetPassword' }));
            // } else {
            //     setTimeout(() => {
            //         displayErrorModal();
            //     }, 1000);
            // }

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
                <Icon style={styles.loginLogo} icon='loginLogo' />
                <Text preset={'headerCenter'} text={'שכחתי סיסמא'} />
                <Text preset={'secondaryCenter'} text={'הכניסו את מספר הניד שלכם\n ונשלח אליכם קוד לאיפוס סיסמא'} />
                <TextField keyboardType={'phone-pad'} onChangeText={(val) => setPhoneNumber(val)} />
                <Text text='מספר טלפון' />
                <Button style={styles.sendButton}  text="שלחו לי קוד לנייד" onPress={sendSMS} />
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
    sendButton: {
        marginTop: 30
    }

});