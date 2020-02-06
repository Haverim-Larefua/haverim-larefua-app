import * as React from "react"
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Icon, Text } from "../../components"
interface PackagesSelectionHeader {
    selectedPackagesNumber: number
    onExitPress?: () => void
    onApprovePress?: () => void
}
export const PackagesSelectionHeader: React.FunctionComponent<PackagesSelectionHeader> = props => {
  const { selectedPackagesNumber, onApprovePress, onExitPress } = props

  const renderPackageIcon = (): React.ReactElement => {
    return (
      <TouchableOpacity onPress={onExitPress}>
        <Icon icon={'close'} />
      </TouchableOpacity>
    )
  }

  const renderHeaderTitle = (): React.ReactElement => {
    return (
      <Text preset={'bold'} style={styles.text}>
        <Text style={styles.innerText} text={`${selectedPackagesNumber}`} />
        <Text style={styles.innerText} text={' חבילות סומנו'} />
      </Text>
    )
  }

  const renderApproveButton = (): React.ReactElement => {
    return <Button style={styles.approveButton} onPress={onApprovePress} text={'איסוף חבילות'}/>
  }
  return (
    <View style={styles.container}>
      {renderApproveButton()}
      {renderHeaderTitle()}
      {renderPackageIcon()}
    </View>
  )
}

const styles = StyleSheet.create({
  approveButton: {
    paddingHorizontal: 15
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    padding: 10
  },
  innerText: {
    textAlign: 'left'
  },
  text: {
    flex: 1,
    marginLeft: 5
  }
})
