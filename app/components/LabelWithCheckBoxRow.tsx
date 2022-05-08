import React, { FC, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { observer } from 'mobx-react-lite';
import { Checkbox, Text } from "."
import { typography } from "../theme"

export interface LabelWithCheckBoxRowProps {
  onCheckBoxPress: (id: string, newVal: boolean) => void
  boldLabel: string
  label: string
  id: string
}

export const LabelWithCheckBoxRow: FC<LabelWithCheckBoxRowProps> = observer(props => {
  const [checkBoxOn, setCheckBoxValue] = useState(false)
  const { onCheckBoxPress, boldLabel, label, id } = props;

  const onPress = (newVal) => {
    onCheckBoxPress(id, newVal);
    setCheckBoxValue(newVal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelsWrapper}>
        <View style={{ flex: 1 }}>
          <Text style={styles.boldText}>{boldLabel}</Text>
        </View>
        <View style={{ flex: 2.5 }}>
          <Text>{label}</Text>
        </View>
      </View >
      <View style={{ justifyContent: 'center'}}>
        <Checkbox iconsStyle={{ width: 24, height: 24 }} value={checkBoxOn} onToggle={onPress}/>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#eeeeee'
  },
  labelsWrapper: {
    flex: 1, flexDirection: 'row-reverse', alignItems: 'center'
  },
  boldText: {
    fontFamily: typography.primaryBold,
    lineHeight: 32,
    fontSize: 16
  },

});
