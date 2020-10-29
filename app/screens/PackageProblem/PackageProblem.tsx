import React, { FC, useMemo } from "react"
import { StyleSheet, View } from 'react-native';
import { Button, Header, Icon, Screen, Text } from "../../components"
import { color } from "../../theme"
import { PackageData, PackageStatus } from '../packagesList/types';
import { NavigationInjectedProps } from "react-navigation"

import { observer } from "mobx-react-lite"
import { RadioButton } from '../../components/radio-button/radio-button';


interface PackageDetailsScreenProps {
    packageData: PackageData
}

export const PackageProblemScreen: FC<NavigationInjectedProps<PackageDetailsScreenProps>> = observer(props => {
    const packageData = props.navigation.state.params.packageData
    const goBack = useMemo(() => () => props.navigation.goBack(null), [props.navigation])
    return (
        <Screen>
            <Header
                rightIcon="rightArrow"
                rightTitle={"חזור"}
                onRightPress={goBack}
                style={{backgroundColor: color.palette.palePink}}
            />

            <View style={styles.container}>
                <Text preset={'bold'} style={styles.statusText} text={"דיווח על בעיה"}/>
            </View>

           <RadioButton/>
        </Screen>
    )

})

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.palette.palePink,
        flexDirection: 'row-reverse',
        padding: 20
    },
    statusText: {
        flex: 1,
        color: "black"
    }
})
