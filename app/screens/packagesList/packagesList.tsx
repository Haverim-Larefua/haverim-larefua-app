import * as React from "react"
import { FlatList, SafeAreaView, StyleSheet } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Screen } from "../../components"
import { PackageData, PackageStatus } from "./types"
import { PackagesListItem } from "./packagesListItem"
import { color, spacing } from "../../theme"
import { WelcomeUserView } from "./welcomeUserView"
import { PackagesScreenHeader } from "./packagesScreenHeader"
import { useEffect, useState } from "react"
import {PackagesSelectionHeader} from "./packagesSelectionHeader";

export interface PackagesListSProps extends NavigationInjectedProps<{}> {}

export const PackagesListScreen: React.FunctionComponent<PackagesListSProps> = props => {
  const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagePickUp'), [props.navigation])
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [isInSelectionMode, setIsInSelectionMode] = useState(false)

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

  return (
    <SafeAreaView style={styles.container}>
      <PackagesSelectionHeader selectedPackagesNumber={4} />
      <PackagesScreenHeader />
      <Screen preset="fixed" backgroundColor={color.transparent}>
        <FlatList ListHeaderComponent={renderListHeader} style={styles.list} keyExtractor={(packageData) => packageData.packageId} data={mockData} renderItem={(packageData) => {
          return <PackagesListItem onPress={() => onPackagePress(packageData.item)} onLongPress={ () => onPackageLongPress(packageData.item)} showSelectedStyle={isPackageSelected(packageData.item)} style={styles.rowStyle} packageData={packageData.item}/>
        }}/>
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
