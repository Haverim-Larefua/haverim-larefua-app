import React, { useState, FC, useEffect } from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { NavigationInjectedProps, SafeAreaView } from "react-navigation";
import { observer } from 'mobx-react-lite';
import { Icon, TabContainer, Text } from "../components";
import { palette } from "../theme/palette";
import { useStores } from "../models/root-store"
import { typography } from "../theme"
import { IconWithLabelsRow } from "../components/IconWithLabelsRow"
import { LabelWithCheckBoxRow } from "../components/LabelWithCheckBoxRow"
import reactotron from "reactotron-react-native"
import { isIphoneX } from "../constants/constants"
import LoadingModal from "../components/loading/loading.modal"

export interface AvailablePackagesProps extends NavigationInjectedProps<{}> {
  showModal: boolean
  onDismiss: () => void
}

const DATA = [
  {
    city: 'רמת גן',
    street: 'רחוב הרואה',
    id: '1'
  },
  {
    city: 'רמת גן',
    street: 'רחוב המעגל',
    id: '2'
  },
  {
    city: 'רמת גן',
    street: 'רחוב אבא הלל סילבר',
    id: '3'
  },
  {
    city: 'גבעתיים',
    street: 'רחוב ויצמן',
    id: '4'
  },
  {
    city: 'גבעתיים',
    street: 'רחוב כורזין',
    id: '5'
  }
]
export const AvailablePackagesModal: FC<AvailablePackagesProps> = observer(props => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
   const [isLoading, setLoaderStatus] = useState(true);

  const {
    packagesStore: { readyToPickUp, deliveredPackages, inDistribution, updatePackagesStatus },
    profileModel: { profile: {
      firstName, lastName
    } }
  } = useStores();

  useEffect(() => {
    if (props.showModal) {
      setModalIsOpen(true);
      setLoaderStatus(true);
      setTimeout(() => {
        setLoaderStatus(false)
      }, 2000)
    }

  }, [props.showModal]);

  return (
    <Modal animated presentationStyle="fullScreen" visible={modalIsOpen} onRequestClose={props.onDismiss} onDismiss={props.onDismiss}>
      <SafeAreaView
        forceInset={{ bottom: 'never' }}
        style={styles.container}
      >
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <TouchableOpacity onPress={() => setModalIsOpen(false)}>
            <Icon style={{ height: 32, width: 32 }} icon="close" />
          </TouchableOpacity>
          <View
            style={styles.header}>
            <Icon style={styles.headerImage} icon="loginLogo" />
            <Text style={styles.headerText} >
              {`בוקר טוב ${firstName} ${lastName}`}
            </Text>
            <Text style={styles.headerSubText} >
              {'חבילות חדשות מוכנות לחלוקה'}
            </Text>
            <View style={styles.addressContainer}>
              <IconWithLabelsRow boldLabel={'נק איסוף '} icon={'locationSmall'} label={' בית הדפוס 11, גבעת שמואל'}/>
              <IconWithLabelsRow boldLabel={'שעות איסוף '} icon={'time'} label={' 20:00 - 08:00'}/>
            </View>
            <Text style={{ marginTop: 29 }}>{'אנא סמנו את היעדים שאליהם תוכלו להתגייס ולשנע את החבילות בהקדם'}</Text>
            <ScrollView directionalLockEnabled horizontal={false} style={{ marginTop: 10, width: '100%' }}>
            { DATA.map((row) => {
              return (<LabelWithCheckBoxRow key={row.id} id={row.id} label={row.street} boldLabel={row.city} onCheckBoxPress={(id: string, newVal) => reactotron.log(id, newVal)}/>)
            })}
            </ScrollView>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => null}
            style={[styles.footerBtn, styles.footerWhiteBtn]}
          >
            <Text preset={'bold'} style={[styles.footerBtnText, { color: palette.darkBlue }]}>
              {'לא הפעם'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={[styles.footerBtn, { marginRight: 8 }]}
          >
            <Text preset={'bold'} style={styles.footerBtnText}>
              {'החבילות עלי'}
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
      <LoadingModal visible={isLoading} />
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerImage: {
    height: 59,
    width: 86
  },
  headerText: {
    color: palette.black,
    marginTop: 8,
    fontFamily: typography.primary,
    fontSize: 16
  },
  headerSubText: {
    color: palette.black,
    fontFamily: typography.primaryBold,
    fontSize: 18
  },
  addressContainer: {
    backgroundColor: '#f0f1fb',
    width: '100%',
    marginTop: 28,
    paddingVertical: 13,
    borderRadius: 4
  },
  footerBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: palette.darkBlue,
    borderRadius: 3,
    height: 48,
    justifyContent: 'center',
  },
  footerWhiteBtn: {
    marginLeft: 8,
    backgroundColor: palette.white,
    borderColor: '#dcdeea',
    borderWidth: 1
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
    paddingHorizontal: 20,
    width: '100%',
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

});
