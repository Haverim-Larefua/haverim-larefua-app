import React, { useImperativeHandle, useState, forwardRef } from 'react';
import {TouchableOpacity, View, StyleSheet} from "react-native";
import { Text } from "../../components"
import { color } from '../../theme';

const RadioButton = forwardRef((props, ref)=>{
    const {buttons, onSelectedChange, containerStyle, radioItemStyle} = props;
    const safeRadioItemStyle = radioItemStyle || {};
    const [activeIndex, setActiveIndex] = useState(null);

    const handleRadioButtonClick = (index : number)=>{
        if(index !== activeIndex){
            onSelectedChange && onSelectedChange(buttons[index]);
            setActiveIndex(index);
        }
    }

    useImperativeHandle(ref, () => ({
        resetSelection: () => {
            setActiveIndex( null)
        }
    }));


    return (
        <View style={containerStyle}>
            {buttons.map((button, index) =>{
                return (
                        <TouchableOpacity style={{...safeRadioItemStyle,...styles.radioItem}} onPress={()=>{handleRadioButtonClick(index)}}>
                            <TouchableOpacity style={{...styles.circle, borderColor: activeIndex === index ? color.palette.darkBlue: "#ACACAC"}} >
                                {activeIndex === index ? (<View style={styles.checkedCircle} />) : (<View />)}
                            </TouchableOpacity>
                            <Text>{button.text}</Text>
                        </TouchableOpacity>
                    )
                }
            )}
        </View>
    )
});

export default RadioButton;


const styles = StyleSheet.create({
    radioItem:{
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ACACAC",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginTop: 2
},
    checkedCircle: {
        width: 12,
        height: 12,
        borderRadius: 7,
        backgroundColor: color.palette.darkBlue
    }
});
