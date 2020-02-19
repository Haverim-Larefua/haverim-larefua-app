import React, { FC } from 'react'
import { View, StyleSheet } from "react-native"
import { TopShadow } from "./topShadow"

export interface TabContainerProps {
  children: React.ReactElement,
}
export const TabContainer: FC<TabContainerProps> = (props) => {
  const { children } = props
  return (
    <View style={styles.scene}>
      <TopShadow/>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  }
})
