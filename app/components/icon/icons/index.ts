export const icons = {
  back: require("./arrow-left.png"),
  bullet: require("./bullet.png"),
  loginLogo: require('./login/loginLogo.png'),
  fiireworks: require('./fiireworks/fiireworks.png'),
  checkboxOff: require("./checkBox/checkbox-off.png"),
  checkboxOn: require("./checkBox/checkbox-on.png"),
  box: require("./packagesList/package.png"),
  close: require("./packagesList/closeIcon.png"),
  rightArrow: require("./rightArrow/rightArrow.png"),
  waze: require("./ic-waze/ic-waze.png"),
  msg: require("./ic-msg/ic-msg.png"),
  location: require("./ic-location/ic-location.png"),
  locationSmall: require("./ic-location-small/ic-location-small.png"),
  time: require("./ic-time/ic-time-small.png"),
  call: require("./ic-call/ic-call.png"),
  thankYou: require('./thankYou/thankyou.png'),
  noPackages: require('./noPackages.png'),
}

export type IconTypes = keyof typeof icons
