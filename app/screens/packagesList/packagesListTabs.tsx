import React, { useState, FC } from "react"
import { Dimensions, FlatList, StyleSheet, View } from "react-native"
import { NavigationInjectedProps, SafeAreaView } from "react-navigation"
import Animated, { Extrapolate } from "react-native-reanimated"
import { observer } from 'mobx-react-lite'
import { Icon, TabContainer, Text } from "../../components"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { palette } from "../../theme/palette"
import { PackageData } from "./types"
import { PackagesListItem } from "./packagesListItem"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"

const initialLayout = { width: Dimensions.get('window').width }
const HEADER_HEIGHT = 130
export interface PackagesListTabProps extends NavigationInjectedProps<{}> {}

export const PackagesListTabs: FC<PackagesListTabProps> = observer(props => {
  const [index, setIndex] = useState(2)
  const [scrollY] = useState(new Animated.Value(0))
  // do not remove spaces from texts below
  const [routes] = useState([
    { key: 'first', title: '  נמסרו  ' },
    { key: 'second', title: '  בחלוקה  ' },
    { key: 'third', title: '  מוכנות לחלוקה  ' },
  ])

  const {
    packagesStore: { readyToPickUp, deliveredPackages, inDistribution },
    profileModel: { profile: {
      firstName, lastName
    } }
  } = useStores()

  const headerY = Animated.interpolate(scrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: Extrapolate.CLAMP
  })

  const headerOpacity = Animated.interpolate(scrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  })

  const FirstRoute = () => {
    return (
      <TabContainer>
        {renderPackagesList(deliveredPackages)}
      </TabContainer>
    )
  }
  const SecondRoute = () => {
    return (
      <TabContainer>
        {renderPackagesList(inDistribution)}
      </TabContainer>
    )
  }
  const ThirdRoute = () => {
    return (
      <TabContainer>
        {renderPackagesList(readyToPickUp)}
      </TabContainer>
    )
  }

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  })
  const scrollToIndex = (nativeEvent) => {
    const { nativeEvent: { targetContentOffset: { y } } } = nativeEvent
    if (y > 0 && y < HEADER_HEIGHT) {
      const offset = y > HEADER_HEIGHT / 2 ? HEADER_HEIGHT : 0
      flatListRef.getNode().scrollToOffset({ animated: true, offset })
    }
  }
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
  let flatListRef = null
  const renderPackagesList = (packages: PackageData[]): React.ReactElement => {
    return (
      <AnimatedFlatList
        ref={(ref) => { flatListRef = ref }}
        scrollEventThrottle={16}
        onScrollEndDrag={(nativeEvent) => {
          scrollToIndex(nativeEvent)
        }}
        onScroll={Animated.event([{
          nativeEvent: { contentOffset: { y: scrollY } }
        }])}
        style={styles.list}
        ListFooterComponent={() => <View style={{ height: 30 }}/>}
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

  const tabBarLabel = ({ route, focused, color }) => {
    return (
      <Text
        preset={focused ? 'bold' : 'default'}
        style={[styles.tabBarLabel, { color: focused ? palette.black : palette.tabBarGrey }]}>
        {route.title}
      </Text>
    )
  }

  const _renderTabBar = props => {
    return (
      <TabBar
        renderLabel={tabBarLabel}
        {...props}
        tabStyle={styles.tabBarLabelContainer}
        contentContainerStyle={styles.tabBarLabelContainer}
        indicatorStyle={styles.indicator}
        style={styles.tabsContainer}
      />)
  }

  // @ts-ignore
  return (
    <SafeAreaView
      forceInset={{ bottom: 'never' }}
      style={styles.container}
    >
      <Animated.View
        style={[styles.header, { opacity: headerOpacity, top: headerY }]}>
        <Icon style={styles.headerImage} icon="loginLogo" />
        <Text style={styles.headerText} >
          {`בוקר טוב ${firstName} ${lastName}`}
        </Text>
      </Animated.View>
      <Animated.View
        // @ts-ignore
        style={[styles.tabViewContainer, { transform: [{ translateY: headerY }] }]}
      >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={_renderTabBar}
          initialLayout={initialLayout}
        />
      </Animated.View>

    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    flex: 1
  },
  header: {
    alignItems: 'center',
    height: HEADER_HEIGHT,
    justifyContent: 'space-around'
  },
  headerImage: {
    height: 59,
    width: 86
  },
  headerText: {
    color: palette.black,
    fontSize: 16
  },
  indicator: {
    backgroundColor: palette.orange,
    borderColor: palette.orange,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderWidth: 2,
    height: 0,
    marginBottom: 0
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 15,
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
  tabBarLabel: {
    fontSize: 14,
    paddingHorizontal: 5
  },
  tabBarLabelContainer: {
    width: 'auto'
  },
  tabViewContainer: {
    flex: 1,
    marginBottom: -HEADER_HEIGHT
  },
  tabsContainer: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    width: 305
  }
})
