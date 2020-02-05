import * as React from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "../../components"
import { color } from "../../theme"

export const PackagesScreenHeader: React.FunctionComponent<{}> = () => {
  return (
    <View style={styles.container}>
      <Text text="שליחים לרפואה" style={styles.text} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.primary,
    paddingVertical: 19
  },
  text: {
    color: color.palette.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 9
  }
})
