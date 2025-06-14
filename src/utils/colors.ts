const LIGHTNESS_BREAKPOINT = 128;

/**
 * Determines if a color is light or not, based on its perceived lightness.
 *
 * For an RGB color, lightness is represented as a number from 0 to 256.
 * The lower the number, the darker is the color perceived.
 *
 * HSP by Darel Rex Finley https://alienryderflex.com/hsp.html
 */
export function isLightColor(colorHex: string): boolean {
  const [r, g, b] = (colorHex.match(/../g) ?? []).map((hex) => parseInt(hex, 16) || 0);
  const perceivedLightness = Math.round(Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2));

  return perceivedLightness >= LIGHTNESS_BREAKPOINT;
}
