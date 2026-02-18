/**
 * Design System Colors
 * Extracted from design system SVG files
 */

export const colors = {
  // Primary Colors from Design System
  peach: "#FFB88C", // C-PEACH
  highlightYellow: "#FFD700", // HIGHLIGHT YELLOW
  mustardYellow: "#FFDB58", // MUSTARD YELLOW
  watermelonRed: "#FF6B6B", // WATERMELON RED
  blushPink: "#FFB6C1", // BLUSH PINK
  forestGreen: "#228B22", // Forest green
  gray: "#EEEEEE", // C-GRAY
  purple: "#F1EAFA", // C-PURPLE
  violet: "#FCF0FF", // C-violet
  borderLight: "#E9EBF8", // Common border color from design system
  
  // UI Colors (from existing codebase)
  primary: "#7029CF", // Primary purple
  primaryHover: "#6d28d9",
  error: "#FA6E6E", // Error red
  success: "#00FF8B", // Success green (dark theme)
  successLight: "#00A394", // Success green (light theme)
  successAlt: "#00B576", // Alternative success green
  
  // Neutral Colors
  dark: {
    background: "#242424",
    backgroundAlt: "#2a2a2a",
    text: "#FFFFFF",
    textSecondary: "#9E9E9E",
    border: "#9E9E9E",
  },
  light: {
    background: "#FFFFFF",
    text: "#000000",
    textPrimary: "#555555",
    textSecondary: "#565656",
    border: "#555555",
    placeholder: "#808080",
  },
  
  // Common Colors
  white: "#FFFFFF",
  black: "#000000",
  offWhite: "#F7F7F7",
} as const;

export type ColorName = keyof typeof colors;
