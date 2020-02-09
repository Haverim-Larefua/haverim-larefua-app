import React, { useEffect, useState } from "react"
import { Animated, Easing, FlatList, SafeAreaView, StyleSheet, View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { PackageData, PackageStatus } from "./types"
import { PackagesListItem } from "./packagesListItem"
import { color, spacing } from "../../theme"
import { WelcomeUserView } from "./welcomeUserView"
import { PackagesScreenHeader } from "./packagesScreenHeader"
import { PackagesSelectionHeader } from "./packagesSelectionHeader"

export interface PackagesListSProps extends NavigationInjectedProps<{}> {}

export const PackagesListScreen: React.FunctionComponent<PackagesListSProps> = props => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [isInSelectionMode, setIsInSelectionMode] = useState(false)
  const selectionHeaderHeight = 75
  const [selectionHeaderAnimationHeight] = useState(new Animated.Value(-selectionHeaderHeight))

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
    toggleSelectionHeaderWithAnimation()
  }, [isInSelectionMode])

  const toggleSelectionHeaderWithAnimation = () => {
    Animated.timing(selectionHeaderAnimationHeight, {
      toValue: isInSelectionMode ? 0 : -selectionHeaderHeight,
      easing: Easing.linear,
      duration: 300,
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
    props.navigation.navigate('packageDetails', { packageData })
  }

  const onPackageLongPress = (packageData: PackageData) => {
    changePackageSelection(packageData)
  }

  const renderListHeader = (): React.ReactElement => {
    return <WelcomeUserView numberOfPackages={4} userDetails={{ firstName: 'דניאל', lastName: 'כהן', id: '5' }}/>
  }

  const renderSelectionModeHeader = (): React.ReactElement => {
    return (
      <Animated.View style={ { ...styles.selectionModeHeader, top: selectionHeaderAnimationHeight }}>
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
      <View style={{ overflow: 'hidden', flex: 1 }}>
        {renderSelectionModeHeader()}
        <PackagesScreenHeader />
        {renderPackagesList()}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.lightGrey,
    flex: 1,
  },
  list: {
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
  selectionModeHeader: {
    backgroundColor: color.palette.white,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
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
