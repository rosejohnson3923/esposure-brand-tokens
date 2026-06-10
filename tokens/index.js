/**
 * @esposure/brand-tokens — typed token object (ESM)
 * =================================================
 * JS-consumable mirror of the canonical CSS custom properties for the shared
 * core. Use in React/Vite sites where you need token values in JS (inline
 * styles, charts, canvas, theme logic) rather than CSS. The CSS file
 * (`@esposure/brand-tokens/css`) remains the runtime source of truth for the DOM.
 *
 * Values are kept in sync with css/brand-tokens.css by hand (no build step).
 */

export const colors = {
  primary: '#8b5cf6',
  primaryDark: '#7c3aed',
  primaryLight: '#a78bfa',
  primarySoft: '#ede9fe',
  secondary: '#6366f1',
  secondaryDark: '#4f46e5',
  secondaryLight: '#818cf8',
  secondarySoft: '#e0e7ff',
  accent: '#10b981',
  accentDark: '#059669',
  accentLight: '#34d399',
  accentSoft: '#d1fae5',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

export const gradients = {
  primary: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  secondary: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  accent: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  learn: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  experience: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
  discover: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
};

export const glass = {
  light: {
    bg: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(139, 92, 246, 0.2)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    blur: '10px',
  },
  dark: {
    bg: 'rgba(26, 32, 44, 0.8)',
    border: 'rgba(139, 92, 246, 0.1)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    blur: '10px',
  },
};

export const spacing = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
};

export const radii = {
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
  button: '0.75rem',
  card: '1.5rem',
};

export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  elevated: '0 20px 40px rgba(0, 0, 0, 0.1)',
  modal: '0 20px 60px rgba(0, 0, 0, 0.15)',
};

export const typography = {
  fontSans:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontMono:
    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
};

const tokens = { colors, gradients, glass, spacing, radii, shadows, typography };
export default tokens;
