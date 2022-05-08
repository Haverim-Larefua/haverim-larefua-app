import { Dimensions, Platform } from 'react-native'
import ExtraDimensions from 'react-native-extra-dimensions-android'

export const IS_IOS = Platform.OS === 'ios'
export const SCREEN_HEIGHT = IS_IOS ? Dimensions.get('window').height : ExtraDimensions.get('REAL_WINDOW_HEIGHT') - ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') - ExtraDimensions.get('STATUS_BAR_HEIGHT')
export const SCREEN_WIDTH = Dimensions.get('window').width
const d = Dimensions.get("window")
export const isIphoneX = !!(Platform.OS === "ios" && (d.height > 800 || d.width > 800))
export const HEADER_HEIGHT = 55
