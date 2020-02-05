import * as React from "react"
import { Animated, StyleSheet, View } from 'react-native'
import { Button, Icon, Text } from "../../components"
interface PackagesSelectionHeader {
    selectedPackagesNumber: number
}
export const PackagesSelectionHeader: React.FunctionComponent<PackagesSelectionHeader> = props => {
  const { selectedPackagesNumber } = props

  return (
    <Animated.View>
      <View style={styles.container}>
        <Button text={'איסוף חבילות'}/>
        <Text preset={'bold'} style={styles.text}>
          <Text style={styles.innerText} text={`${selectedPackagesNumber}`} />
          <Text style={styles.innerText} text={' חבילות סומנו'} />
        </Text>
        <Icon icon={'close'} />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    padding: 10
  },
  text: {
    flex: 1,
    marginLeft: 5
  },
    innerText: {
      textAlign: 'left'
    }
})
