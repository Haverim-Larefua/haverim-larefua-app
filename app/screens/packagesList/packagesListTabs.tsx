import * as React from 'react'
import { View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, FlatList } from "react-native"
import Animated from 'react-native-reanimated'
import { Button, Checkbox, Icon, Screen, Text } from "../../components"

import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import { SCREEN_WIDTH } from "../../constants/constants"
import { palette } from "../../theme/palette"
import { PackageData } from "./types"
import { PackagesListItem } from "./packagesListItem"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import reactotron from "reactotron-react-native"

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
)

const initialLayout = { width: Dimensions.get('window').width }

export const PackagesListTabs = (props) => {
  const [index, setIndex] = React.useState(0)
  // do not remove spaces from texts below
  const [routes] = React.useState([
    { key: 'first', title: '  נמסרו  ' },
    { key: 'second', title: '  בחלוקה  ' },
    { key: 'third', title: '  מוכנות לחלוקה  ' },
  ])
  const { packagesStore: { readyToPickUp, deliveredPackages, inDistribution }, profileModel: { profile } } = useStores()

  const FirstRoute = () => {
    return (
      <View style={styles.scene}>
        <View style={{
        // borderWidth: 1,
          marginTop: -5,
          width: 'auto',
          height: 5,
          backgroundColor: 'white',
          // borderTopWidth: 0.5,
          // borderColor: 'rgba(0,0,0,0.2)',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 10,
        }}/>
        {renderPackagesList(deliveredPackages)}
      </View>
    )
  }
  const SecondRoute = () => {
    return (
      <View style={styles.scene}>
        <View style={{
          // borderWidth: 1,
          marginTop: -5,
          width: 'auto',
          height: 5,
          backgroundColor: 'white',
          // borderTopWidth: 0.5,
          // borderColor: 'rgba(0,0,0,0.2)',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 10,
        }}/>
        {renderPackagesList(inDistribution)}
      </View>
    )
  }
  const ThirdRoute = () => {
    return (
      <View style={styles.scene}>
        <View style={{
          // borderWidth: 1,
          marginTop: -5,
          width: 'auto',
          height: 5,
          backgroundColor: 'white',
          // borderTopWidth: 0.5,
          // borderColor: 'rgba(0,0,0,0.2)',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 10,
        }}/>
        {renderPackagesList(readyToPickUp)}
      </View>
    )
  }
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  })

  const renderPackagesList = (packages: [PackageData]): React.ReactElement => {
    return (
      <FlatList
        // ListHeaderComponent={renderListHeader}
        style={styles.list}
        keyExtractor={(packageData) => packageData.id.toString()}
        data={packages}
        renderItem={(packageDataItem) => {
          return renderPackageListItem(packageDataItem.item)
        }
        }/>
    )
  }
  const onPackagePress = (packageData: PackageData) => {
    props.navigation.navigate('packageDetails', { packageData })
  }

  const renderPackageListItem = (packageData: PackageData): React.ReactElement => {
    return (
      <PackagesListItem onPress={() => onPackagePress(packageData)}
        // onLongPress={ () => onPackageLongPress(packageData)}
        // showSelectedStyle={isPackageSelected(packageData)}
        style={styles.rowStyle}
        packageData={packageData}
      />)
  }

  const _renderTabBar = props => {
    return (
      <TabBar
        renderLabel={({ route, focused, color }) => (

          <Text preset={focused ? 'bold' : 'default'} style={{ color: focused ? palette.black : palette.tabBarGrey, fontSize: 14, paddingHorizontal: 5 }}>
            {route.title}
            {console.log('color', color)}
          </Text>

        )}
        {...props}
        tabStyle={{ width: 'auto' }}
        contentContainerStyle={{ alignSelf: 'center', justifyContent: 'center' }}
        indicatorStyle={{ marginBottom: 0, backgroundColor: palette.orange, borderColor: palette.orange, borderWidth: 2, height: 0, borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
        style={{ width: 305, alignSelf: 'center', backgroundColor: 'transparent' }}
      />)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={_renderTabBar}
        // sceneContainerStyle={{ borderTopWidth: 2}}
        initialLayout={initialLayout}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: 15,
    paddingHorizontal: 10
  },
  rowStyle: {
    marginBottom: spacing.mediumSpacing,
    shadowColor: color.palette.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    padding: 16,
  },
})
