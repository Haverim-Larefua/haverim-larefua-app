import { TextStyle } from "react-native"
import { color, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: 16,
  lineHeight: 24,
  textAlign: 'right'
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A smaller piece of secondard information.
   */
  secondary: { ...BASE, fontSize: 14 } as TextStyle,

    /**
   * A smaller piece of secondard information with textAlign center.
   */
  secondaryCenter: { ...BASE, fontSize: 14, textAlign: 'center' } as TextStyle,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  /**
   * Large headers.
   */
  header: { ...BASE, fontSize: 24, fontWeight: "bold" } as TextStyle,

    /**
   * Large headers.
   */
    headerCenter: { ...BASE, fontSize: 24, fontWeight: "bold", textAlign: "center" } as TextStyle,


  /**
   * Field labels that appear on forms above the inputs.
   */
  tagLabel: { ...BASE, fontSize: 13, color: color.dim } as TextStyle,
  buttonText: { ...BASE, color: color.palette.white }
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
