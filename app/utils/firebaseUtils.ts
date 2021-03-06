import { firebase } from "@react-native-firebase/messaging"

export const getFcmTokenFlow = async () => {
  try {
    const permissionGranted = await firebase.messaging().requestPermission()
    if (permissionGranted) {
      if (!firebase.messaging().isRegisteredForRemoteNotifications) {
        await firebase.messaging().registerForRemoteNotifications()
      }
      const fcmToken = await firebase.messaging().getToken()
      return fcmToken
    }
  } catch (e) {
    return false
  }

  /* const subscribe = firebase.messaging().onMessage(async (remoteMessage) => {
      // data for deep linking if needed
      console.log('FCM Message Data:', remoteMessage.data);
    }); */
  // unsubscribe for notifications
  // subscribe()
  return false
}
