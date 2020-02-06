import * as React from "react"
import { Animated, Easing, FlatList, SafeAreaView, StyleSheet } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Screen } from "../../components"
import { PackageData, PackageStatus } from "./types"
import { PackagesListItem } from "./packagesListItem"
import { color, spacing } from "../../theme"
import { WelcomeUserView } from "./welcomeUserView"
import { PackagesScreenHeader } from "./packagesScreenHeader"
import { useEffect, useState } from "react"
import { PackagesSelectionHeader } from "./packagesSelectionHeader"

export interface PackagesListSProps extends NavigationInjectedProps<{}> {}

export const PackagesListScreen: React.FunctionComponent<PackagesListSProps> = props => {
  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagePickUp'), [props.navigation])
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [isInSelectionMode, setIsInSelectionMode] = useState(false)
  const selectionHeaderHeight = 75
  const selectionHeaderAnimationHeight = new Animated.Value(0)

  useEffect(
    () => {
      if (selectedPackages.length === 0) {
        isInSelectionMode && setIsInSelectionMode(false)
      } else {
        !isInSelectionMode && setIsInSelectionMode(true)
      }
    },
    [selectedPackages]
  )

  useEffect(() => {
    if (isInSelectionMode) {
      showSelectionHeaderWithAnimation()
    } else {
      hideSelectionHeaderWithAnimation()
    }
  }, [isInSelectionMode])

  const hideSelectionHeaderWithAnimation = () => {
    Animated.timing(selectionHeaderAnimationHeight, {
      toValue: 0,
      easing: Easing.linear
    }).start()
  }

  const showSelectionHeaderWithAnimation = () => {
    Animated.timing(selectionHeaderAnimationHeight, {
      toValue: selectionHeaderHeight,
      easing: Easing.linear
    }).start()
  }

  const isPackageSelected = (packageData: PackageData): boolean => {
    return selectedPackages.includes(packageData.packageId, 0)
  }

  const addPackageToSelectedList = (packageData: PackageData) => {
    const newSelectedPackagesList = Array.from(selectedPackages)
    newSelectedPackagesList.push(packageData.packageId)
    setSelectedPackages(newSelectedPackagesList)
  }

  const removePackageFromSelectedList = (packageData: PackageData) => {
    const packageIndex = selectedPackages.indexOf(packageData.packageId)
    if (packageIndex > -1) {
      const newSelectedPackagesList = Array.from(selectedPackages)
      newSelectedPackagesList.splice(packageIndex, 1)
      setSelectedPackages(newSelectedPackagesList)
    }
  }

  const changePackageSelection = (packageData: PackageData) => {
    if (isPackageSelected(packageData)) {
      removePackageFromSelectedList(packageData)
    } else {
      addPackageToSelectedList(packageData)
    }
  }

  const onPackagePress = (packageData: PackageData) => {
    if (isInSelectionMode) {
      changePackageSelection(packageData)
      return
    }

    goToNextPage()
  }

  const onPackageLongPress = (packageData: PackageData) => {
    changePackageSelection(packageData)
  }

  const renderListHeader = (): React.ReactElement => {
    return <WelcomeUserView numberOfPackages={4} userDetails={{ firstName: 'דניאל', lastName: 'כהן', id: '5' }}/>
  }

  const renderSelectionModeHeader = (): React.ReactElement => {
    return (
      <Animated.View style={ { ...styles.selectionModeHeader, height: selectionHeaderAnimationHeight, hidden: !isInSelectionMode }}>
        <PackagesSelectionHeader
          onExitPress={() => setSelectedPackages([])}
          onApprovePress={() => {}}
          selectedPackagesNumber={selectedPackages.length} />
      </Animated.View>
    )
  }

  const renderPackagesList = (): React.ReactElement => {
    return (
      <FlatList ListHeaderComponent={renderListHeader} style={styles.list} keyExtractor={(packageData) => packageData.packageId} data={mockData} renderItem={(packageDataItem) => {
        return renderPackageListItem(packageDataItem.item)
      }}/>
    )
  }

  const renderPackageListItem = (packageData: PackageData): React.ReactElement => {
    return (
      <PackagesListItem onPress={() => onPackagePress(packageData)}
        onLongPress={ () => onPackageLongPress(packageData)}
        showSelectedStyle={isPackageSelected(packageData)}
        style={styles.rowStyle} packageData={packageData}/>)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Screen preset="fixed" backgroundColor={color.transparent}>
        {renderSelectionModeHeader()}
        <PackagesScreenHeader />
        {renderPackagesList()}
      </Screen>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.lightGrey,
    flex: 1,
  },
  list: {
    marginHorizontal: 10
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
  selectionModeHeader: {
    backgroundColor: color.palette.white,
    position: 'absolute',
    width: '100%',
    zIndex: 5
  }
})

const mockData: PackageData[] = [
  {
    packageId: '1',
    destination: {
      city: 'באר שבע',
      street: 'ישראל רבי עקיבא',
      number: '30',
      apartment: '45'
    },
    status: PackageStatus.ReadyForDelivery,
    receiver: {
      firstName: 'מירב',
      lastName: 'בן אבו',
      id: '123'
    },
    messenger: {
      firstName: 'ישראל',
      lastName: 'ישראלי',
      id: '4567'
    }
  },
  {
    packageId: '2',
    destination: {
      city: 'באר שבע',
      street: 'ישראל רבי עקיבא',
      number: '30',
      apartment: '45'
    },
    status: PackageStatus.InDelivery,
    receiver: {
      firstName: 'מירב',
      lastName: 'בן אבו',
      id: '123'
    },
    messenger: {
      firstName: 'ישראל',
      lastName: 'ישראלי',
      id: '4567'
    }
  },
  {
    packageId: '3',
    destination: {
      city: 'באר שבע',
      street: 'ישראל רבי עקיבא',
      number: '30',
      apartment: '45'
    },
    status: PackageStatus.Delivered,
    receiver: {
      firstName: 'מירב',
      lastName: 'בן אבו',
      id: '123'
    },
    messenger: {
      firstName: 'ישראל',
      lastName: 'ישראלי',
      id: '4567'
    }
  },
  {
    packageId: '4',
    destination: {
      city: 'באר שבע',
      street: 'ישראל רבי עקיבא',
      number: '30',
      apartment: '45'
    },
    status: PackageStatus.ReadyForDelivery,
    receiver: {
      firstName: 'מירב',
      lastName: 'בן אבו',
      id: '123'
    },
    messenger: {
      firstName: 'ישראל',
      lastName: 'ישראלי',
      id: '4567'
    }
  },
  {
    packageId: '5',
    destination: {
      city: 'באר שבע',
      street: 'ישראל רבי עקיבא',
      number: '30',
      apartment: '45'
    },
    status: PackageStatus.ReadyForDelivery,
    receiver: {
      firstName: 'מירב',
      lastName: 'בן אבו',
      id: '123'
    },
    messenger: {
      firstName: 'ישראל',
      lastName: 'ישראלי',
      id: '4567'
    }
  },
  {
    packageId: '6',
    destination: {
      city: 'באר שבע',
      street: 'ישראל רבי עקיבא',
      number: '30',
      apartment: '45'
    },
    status: PackageStatus.ReadyForDelivery,
    receiver: {
      firstName: 'מירב',
      lastName: 'בן אבו',
      id: '123'
    },
    messenger: {
      firstName: 'ישראל',
      lastName: 'ישראלי',
      id: '4567'
    }
  },
  {
    packageId: '7',
    destination: {
      city: 'באר שבע',
      street: 'ישראל רבי עקיבא',
      number: '30',
      apartment: '45'
    },
    status: PackageStatus.ReadyForDelivery,
    receiver: {
      firstName: 'מירב',
      lastName: 'בן אבו',
      id: '123'
    },
    messenger: {
      firstName: 'ישראל',
      lastName: 'ישראלי',
      id: '4567'
    }
  },
  {
    packageId: '8',
    destination: {
      city: 'באר שבע',
      street: 'ישראל רבי עקיבא',
      number: '30',
      apartment: '45'
    },
    status: PackageStatus.ReadyForDelivery,
    receiver: {
      firstName: 'מירב',
      lastName: 'בן אבו',
      id: '123'
    },
    messenger: {
      firstName: 'ישראל',
      lastName: 'ישראלי',
      id: '4567'
    }
  },
  {
    packageId: '9',
    destination: {
      city: 'באר שבע',
      street: 'ישראל רבי עקיבא',
      number: '30',
      apartment: '45'
    },
    status: PackageStatus.ReadyForDelivery,
    receiver: {
      firstName: 'מירב',
      lastName: 'בן אבו',
      id: '123'
    },
    messenger: {
      firstName: 'ישראל',
      lastName: 'ישראלי',
      id: '4567'
    }
  }
]
