/**
 * Color Utility Functions
 * Helper to use design system colors in components
 * Global design system for the entire project
 */

import { colors } from './colors';

/**
 * Get a color value from the design system
 * @param colorName - Name of the color from the design system
 * @returns CSS variable reference or color value
 */
export function getColor(colorName: keyof typeof colors | string): string {
  // Map color names to CSS variables
  const colorMap: Record<string, string> = {
    peach: 'var(--color-peach)',
    highlightYellow: 'var(--color-highlight-yellow)',
    mustardYellow: 'var(--color-mustard-yellow)',
    watermelonRed: 'var(--color-watermelon-red)',
    blushPink: 'var(--color-blush-pink)',
    forestGreen: 'var(--color-forest-green)',
    gray: 'var(--color-gray)',
    purple: 'var(--color-purple)',
    violet: 'var(--color-violet)',
    borderLight: 'var(--color-border-light)',
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    error: 'var(--color-error)',
    success: 'var(--color-success)',
    successLight: 'var(--color-success-light)',
    successAlt: 'var(--color-success-alt)',
    white: 'var(--color-white)',
    black: 'var(--color-black)',
    offWhite: 'var(--color-off-white)',
  };

  // Handle nested objects (dark, light)
  if (colorName === 'dark' || colorName === 'light') {
    return ''; // Return empty string for nested objects, use themeColors instead
  }

  // Return CSS variable if mapped, otherwise return the color value
  if (colorMap[colorName]) {
    return colorMap[colorName];
  }

  // For nested properties, return empty (should use themeColors)
  return '';
}

/**
 * Get theme-specific colors
 */
export const themeColors = {
  dark: {
    bg: 'var(--dark-bg)',
    bgAlt: 'var(--dark-bg-alt)',
    text: 'var(--dark-text)',
    textSecondary: 'var(--dark-text-secondary)',
    border: 'var(--dark-border)',
  },
  light: {
    bg: 'var(--light-bg)',
    text: 'var(--light-text)',
    textPrimary: 'var(--light-text-primary)',
    textSecondary: 'var(--light-text-secondary)',
    border: 'var(--light-border)',
    placeholder: 'var(--light-placeholder)',
  },
};
