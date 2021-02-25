import React, { FC } from "react";
import { StyleSheet, View } from "react-native"
import { observer } from 'mobx-react-lite';
import { Icon, Text } from ".";
import { palette } from "../theme/palette";
import { typography } from "../theme"
import { IconTypes } from "./icon/icons"

export interface AvailablePackagesProps {
  icon: IconTypes
  boldLabel: string
  label: string
}

export const IconWithLabelsRow: FC<AvailablePackagesProps> = observer(props => {
  const { icon, boldLabel, label } = props;
  return (
    <View style={{ flexDirection: 'row-reverse' }}>
      <Icon style={styles.icon} icon={icon}/>
      <Text>
        <Text style={styles.boldText}>{boldLabel}</Text>
        <Text>{label}</Text>
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  icon: {
    tintColor: palette.black,
    marginHorizontal: 10
  },
  boldText: {
    fontFamily: typography.primaryBold,
    lineHeight: 32,
    fontSize: 16
  }
});
