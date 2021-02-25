import React, { useState, FC } from "react"
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { NavigationInjectedProps, SafeAreaView } from "react-navigation"
import Animated, { Extrapolate } from "react-native-reanimated"
import { observer } from 'mobx-react-lite'
import { Icon, TabContainer, Text, TopShadow } from "../../components"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { palette } from "../../theme/palette"
import { PackageData, PackageStatusAPI } from "./types"
import { PackagesListItem } from "./packagesListItem"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { isIphoneX } from "../../constants/constants"
import { icons } from "../../components/icon/icons"
import { AvailablePackagesModal } from "../AvailablePackagesModal"

const initialLayout = { width: Dimensions.get('window').width }
const HEADER_HEIGHT = 130
export interface PackagesListTabProps extends NavigationInjectedProps<{}> {}

export const PackagesListTabs: FC<PackagesListTabProps> = observer(props => {
  const [index, setIndex] = useState(2)
  const [showModal, showAvailablePackagesModal] = useState(false)
  const [scrollY] = useState(new Animated.Value(0))
  // do not remove spaces from texts below
  const [routes] = useState([
    { key: 'first', title: '  נמסרו  ' },
    { key: 'second', title: '  בחלוקה  ' },
    { key: 'third', title: '  מוכנות לחלוקה  ' },
  ])

  const {
    packagesStore: { readyToPickUp, deliveredPackages, inDistribution, updatePackagesStatus },
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
    if (readyToPickUp.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <TopShadow/>
          <View style={styles.noPackagesWrapper}>
            <Image resizeMethod={'auto'} style={{ height: 180, width: 120 }} source={icons['noPackages']} />
            <Text preset={'bold'} style={{ marginTop: 36, fontSize: 16 }}>
              {'אין חבילות לחלוקה'}
            </Text>
          </View>
        </View>
      )
    }
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
    const { nativeEvent: { contentOffset: { y } } } = nativeEvent
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

  const renderFooter = () => {
    if (readyToPickUp.length === 0) return null
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          {`סה״כ ${readyToPickUp.length} חבילות ממתינות במרכז חלוקה`}
        </Text>
        <TouchableOpacity
          onPress={onPickUpPackagesPress}
          style={styles.footerBtn}
        >
          <Text preset={'bold'} style={styles.footerBtnText}>
            {'איסוף'}
          </Text>
        </TouchableOpacity>

      </View>
    )
  }

  const onPickUpPackagesPress = async() => {
    const packagesArr = readyToPickUp.map(p => p.id)
    await updatePackagesStatus(packagesArr, PackageStatusAPI.distribution)
  }
  // @ts-ignore
  return (
    <SafeAreaView
      forceInset={{ bottom: 'never' }}
      style={styles.container}
    >
      <Animated.View
        style={[styles.header, { opacity: headerOpacity, top: headerY }]}>
        <TouchableOpacity onPress={() => showAvailablePackagesModal(true)}>
          <Text> click me </Text>
        </TouchableOpacity>
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
      {renderFooter()}
      <AvailablePackagesModal
        showModal={showModal}
        onDismiss={() => showAvailablePackagesModal(false)}
        navigation={props.navigation}
      />
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    flex: 1
  },
  footerBtn: {
    alignItems: 'center',
    backgroundColor: palette.darkBlue,
    borderRadius: 3,
    height: 48,
    justifyContent: 'center',
    width: 150
  },
  footerBtnText: {
    color: palette.white,
    fontSize: 16
  },
  footerContainer: {
    alignItems: 'center',
    backgroundColor: palette.white,
    elevation: 10,
    flexDirection: 'row-reverse',
    height: isIphoneX ? 100 : 80,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84
  },
  footerText: {
    color: palette.black,
    fontSize: 14,
    width: 170
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
  },
  noPackagesWrapper: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
