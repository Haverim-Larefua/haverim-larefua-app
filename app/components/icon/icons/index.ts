export const icons = {
  back: require("./arrow-left.png"),
  bullet: require("./bullet.png"),
  loginLogo: require('./login/loginLogo.png'),
  checkboxOff: require("./checkBox/checkbox-off.png"),
  checkboxOn: require("./checkBox/checkbox-on.png"),
  box: require("./packagesList/package.png"),
  close: require("./packagesList/closeIcon.png"),
  rightArrow: require("./rightArrow/rightArrow.png"),
  waze: require("./ic-waze/ic-waze.png"),
  msg: require("./ic-msg/ic-msg.png"),
  location: require("./ic-location/ic-location.png"),
  call: require("./ic-call/ic-call.png"),
  thankYou: require('./thankYou/thankyou.png')
}

export type IconTypes = keyof typeof icons
