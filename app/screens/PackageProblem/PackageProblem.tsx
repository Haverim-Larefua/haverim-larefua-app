import React, { FC, useMemo, useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Header, Icon, Screen, Text, TextField } from '../../components';
import { color } from "../../theme"
import { PackageData, PackageStatus } from '../packagesList/types';
import { NavigationInjectedProps } from "react-navigation";
import { SCREEN_HEIGHT } from "../../constants/constants";
import { useStores } from "../../models/root-store"

import { observer } from "mobx-react-lite"
import RadioButton from '../../components/radio-button/radio-button';



interface PackageDetailsScreenProps {
    packageData: PackageData
}

export const PackageProblemScreen: FC<NavigationInjectedProps<PackageDetailsScreenProps>> = observer(props => {
    const packageData = props.navigation.state.params.packageData
    const goBack = useMemo(() => () => props.navigation.goBack(null), [props.navigation])
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [isOtherProblemSelected, setIsOtherProblemSelected] = useState<boolean>(false);
    const [otherProblemText, setOtherProblemText] = useState<string>("");
    const { packagesStore: { reportProblem } } = useStores();

    const radioGroupRef = useRef();
    const otherRadioGroupRef = useRef();

    const radioButtons=[{
        value: "no recipient",
        text: "אין נמען לקבל את החבילה"
    },{
        value: "cant find address",
        text: "לא מצאתי את הכתובת ברשומה"
    },
    {
        value: "cant make it on time",
        text: "לא אספיק להגיע אל יעד המסירה"
    }];

    const otherRadioButtons=[{
        value: "other",
        text: "בעיה אחרת"
    }];

    const handleRadioButtonClick = (value)=>{
        otherRadioGroupRef.current.resetSelection();
        setIsOtherProblemSelected(false);
        setOtherProblemText("");
        setSelectedProblem(value)
    }
    const handleOtherRadioButtonClick = (value)=>{
        radioGroupRef.current.resetSelection();
        setIsOtherProblemSelected(true);
        setSelectedProblem(value)
    }

    const sendReportProblem = async ()=>{
        if(selectedProblem) {
            const selectedProblemText = selectedProblem.value === "other" ? otherProblemText : selectedProblem.text;
            const response = await reportProblem(packageData.id, selectedProblemText);
            if (response.ok) {
                goBack();
            } else{
                Alert.alert('הפעולה נכשלה');
            }
        }
    }

    return (
        <Screen preset="scroll" style={{height: SCREEN_HEIGHT - 40}}>
            <Header
                rightIcon="rightArrow"
                rightTitle={'חזור'}
                onRightPress={goBack}
                style={{ backgroundColor: color.palette.palePink }}
            />

            <View style={styles.headerContainer}>
                <Text preset={'bold'} style={styles.statusText} text={'דיווח על בעיה'} />
            </View>

            <View style={styles.contentContainer}>
                <View>
                    <RadioButton
                        ref={radioGroupRef}
                        buttons={radioButtons}
                        onSelectedChange={handleRadioButtonClick}
                        radioItemStyle={{ paddingTop: 20 }}
                    />
                    <View style={styles.hr}></View>

                    <RadioButton
                        ref={otherRadioGroupRef}
                        buttons={otherRadioButtons}
                        onSelectedChange={handleOtherRadioButtonClick}
                        radioItemStyle={{ paddingTop: 20 }}
                    />

                    <TextField
                        multiline={true}
                        numberOfLines={6}
                        inputStyle={{ textAlignVertical: 'top'}}
                        editable={isOtherProblemSelected}
                        placeholder={'תיאור הבעיה'}
                        value={otherProblemText}
                        onChangeText={(val) => setOtherProblemText(val)}
                    >
                    </TextField>
                </View>

                <SafeAreaView>
                    <Button
                        disabled={!selectedProblem}
                        onPress={sendReportProblem}
                        text={'שליחת דיווח'}
                    />
                </SafeAreaView>


            </View>



        </Screen>
    );

})

const styles = StyleSheet.create({
    contentContainer:{
        height: SCREEN_HEIGHT - 160,
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between',
    },
    hr:{
        height: 2,
        marginTop: 20,
        backgroundColor: color.palette.greyLight
    },
    headerContainer: {
        backgroundColor: color.palette.palePink,
        flexDirection: 'row-reverse',
        padding: 20
    },
    statusText: {
        flex: 1,
        color: "black"
    }
})
