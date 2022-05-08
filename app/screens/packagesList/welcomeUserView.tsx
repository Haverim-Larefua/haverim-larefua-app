import * as React from "react"
import { Person } from "./types"
import { Icon, Text } from "../../components"
import { StyleSheet, View } from "react-native"
import { spacing } from "../../theme";

interface WelcomeUserViewProps {
    userDetails: Person
    numberOfPackages: number
}
export const WelcomeUserView: React.FunctionComponent<WelcomeUserViewProps> = props => {
  const { firstName, lastName } = props.userDetails
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} icon={'box'}/>
      <View>
        <Text style={styles.titleText} preset={'bold'}>
          <Text text={'בוקר טוב '} />
          <Text text={`${firstName} ${lastName}`} />
        </Text>
        <Text>
          <Text preset={'bold'} text={`${props.numberOfPackages}`}/>
          <Text text={' חבילות מוכנות לחלוקה'} />
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    paddingVertical: spacing.bigSpacing
  },
  icon: {
    marginHorizontal: 24
  },
  titleText: {
    fontSize: 18
  }
})
