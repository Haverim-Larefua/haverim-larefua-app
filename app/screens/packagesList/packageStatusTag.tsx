import * as React from "react"
import { Text } from "../../components"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

interface PackageStatusTagProps {
  status: string
    style?: StyleProp<ViewStyle>
}
export const PackageStatusTag: React.FunctionComponent<PackageStatusTagProps> = props => {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text} preset="secondary" text={props.status} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2ebf8',
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    height: 24,
    paddingLeft: 4,
    paddingRight: 10
  },
  text: {
    fontWeight: 'bold',
    marginVertical: 2,
  }
})
