import { Platform } from "react-native"

/**
 * Just the font names.
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({ ios: 'Arimo', android: "Arimo" }),

  primaryBold: Platform.select({ ios: "Arimo-Bold", android: "Arimo-Bold" })
}
