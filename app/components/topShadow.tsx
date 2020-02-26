import React, { FC } from 'react'
import { View, StyleSheet } from "react-native"

export const TopShadow: FC = (props) => {

  return (
    <View style={styles.shadow}/>
  )
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: 'white',
    elevation: 10,
    height: 5,
    marginTop: -5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 'auto',
  },
})
