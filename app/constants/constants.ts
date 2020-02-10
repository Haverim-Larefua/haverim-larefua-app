import { Dimensions, Platform } from 'react-native'
import ExtraDimensions from 'react-native-extra-dimensions-android'

export const IS_IOS = Platform.OS === 'ios'
export const IS_IPHONE_X = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (Dimensions.get('window').height === 812 || Dimensions.get('window').width === 812)
export const SCREEN_HEIGHT = Platform.OS === 'ios' ? Dimensions.get('window').height : ExtraDimensions.get('REAL_WINDOW_HEIGHT') - ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') - ExtraDimensions.get('STATUS_BAR_HEIGHT')
export const SCREEN_WIDTH = Dimensions.get('window').width

export const HEADER_HEIGHT = 55
export const ACTIVE_OPACITY = 0.6
