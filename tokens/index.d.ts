/**
 * @esposure/brand-tokens — type declarations
 */

export interface GrayScale {
  50: string; 100: string; 200: string; 300: string; 400: string;
  500: string; 600: string; 700: string; 800: string; 900: string;
}

export interface Colors {
  primary: string; primaryDark: string; primaryLight: string; primarySoft: string;
  secondary: string; secondaryDark: string; secondaryLight: string; secondarySoft: string;
  accent: string; accentDark: string; accentLight: string; accentSoft: string;
  success: string; error: string; warning: string; info: string;
  white: string; black: string;
  gray: GrayScale;
}

export interface Gradients {
  primary: string; secondary: string; accent: string;
  learn: string; experience: string; discover: string;
}

export interface GlassSurface {
  bg: string; border: string; shadow: string; blur: string;
}
export interface Glass { light: GlassSurface; dark: GlassSurface; }

export type Spacing = Record<string, string>;
export type Radii = Record<string, string>;
export type Shadows = Record<string, string>;

export interface Typography {
  fontSans: string;
  fontMono: string;
  weights: Record<string, number>;
}

export const colors: Colors;
export const gradients: Gradients;
export const glass: Glass;
export const spacing: Spacing;
export const radii: Radii;
export const shadows: Shadows;
export const typography: Typography;

declare const tokens: {
  colors: Colors;
  gradients: Gradients;
  glass: Glass;
  spacing: Spacing;
  radii: Radii;
  shadows: Shadows;
  typography: Typography;
};
export default tokens;
