import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing.mediumSpacing,
  paddingHorizontal: spacing.mediumSpacing,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.primary } as ViewStyle,
  button: { ...BASE_VIEW, backgroundColor: color.primary, paddingVertical: 10 },

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
