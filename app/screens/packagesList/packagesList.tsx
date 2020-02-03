import * as React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Screen } from "../../components"
import { PackageData, PackageStatus } from "./types"
import { PackagesListItem } from "./packagesListItem"
import { color, spacing } from "../../theme"
import { WelcomeUserView } from "./welcomeUserView"
import {PackagesScreenHeader} from "./packagesScreenHeader";

export interface PackagesListSProps extends NavigationInjectedProps<{}> {}

export const PackagesListScreen: React.FunctionComponent<PackagesListSProps> = props => {
  // const goToNextPage = React.useMemo(() => () => props.navigation.navigate('packagePickUp'), [props.navigation])

  const renderListHeader = (): React.ReactElement => {
    return <WelcomeUserView numberOfPackages={4} userDetails={{ firstName: 'דניאל', lastName: 'כהן', id: '5' }}/>
  }

  return (
    <View style={styles.container}>
      <PackagesScreenHeader />
      <Screen preset="fixed" backgroundColor={color.transparent}>
        <FlatList ListHeaderComponent={renderListHeader} style={styles.list} keyExtractor={(packageData) => packageData.packageId} data={mockData} renderItem={(packageData) => {
          return <PackagesListItem style={styles.rowStyle} packageData={packageData.item}/>
        }}/>
      </Screen>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.lightGrey,
    flex: 1,
  },
  rowStyle: {
    marginBottom: spacing.mediumSpacing,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },
  list: {
    marginHorizontal: 10
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
    packageId: '3',
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
