# Global Design System

This is the **global design system** for the entire project. All colors, fonts, and design tokens are centralized here.

## Structure

```
src/design-system/
├── colors.ts          # TypeScript color definitions
├── useColors.ts      # Utility functions for using colors
├── index.ts          # Main exports
└── README.md         # This file
```

## Colors

All colors are defined as CSS variables in `src/app/globals.css`:

### Design System Colors
- `--color-peach`: #FFB88C
- `--color-highlight-yellow`: #FFD700
- `--color-mustard-yellow`: #FFDB58
- `--color-watermelon-red`: #FF6B6B
- `--color-blush-pink`: #FFB6C1
- `--color-forest-green`: #228B22
- `--color-gray`: #EEEEEE
- `--color-purple`: #F1EAFA
- `--color-violet`: #FCF0FF
- `--color-border-light`: #E9EBF8

### UI Colors
- `--color-primary`: #7029CF (Primary purple)
- `--color-primary-hover`: #6d28d9
- `--color-error`: #FA6E6E
- `--color-success`: #00FF8B (Dark theme)
- `--color-success-light`: #00A394 (Light theme)
- `--color-success-alt`: #00B576

### Theme Colors
- Dark: `--dark-bg`, `--dark-text`, `--dark-text-secondary`, `--dark-border`
- Light: `--light-bg`, `--light-text`, `--light-text-primary`, `--light-text-secondary`, `--light-border`

## Usage

### In CSS Modules

```css
.myComponent {
  color: var(--color-primary);
  background-color: var(--light-bg);
  border: 1px solid var(--light-border);
}
```

### In TypeScript/React Components

```tsx
import { getColor, themeColors } from '@/design-system';

// Using getColor
<div style={{ color: getColor('primary') }}>
  Text
</div>

// Using themeColors
<div style={{ backgroundColor: themeColors.light.bg }}>
  Content
</div>

// Direct CSS variables (recommended)
<div style={{ color: 'var(--color-primary)' }}>
  Text
</div>
```

### In Inline Styles

```tsx
<div style={{ 
  color: 'var(--color-primary)',
  backgroundColor: 'var(--light-bg)'
}}>
  Content
</div>
```

## Fonts

Fonts are defined in `src/app/globals.css`:

- **GT Walsheim**: Regular (400), Medium (600), Bold (700), Ultra Bold (800)
- **Lora**: Regular Italic (400), Medium Italic (500), SemiBold Italic (600), Bold Italic (700)

Use directly in CSS:
```css
.myText {
  font-family: "GT Walsheim";
  font-weight: 600; /* Medium */
  font-style: normal;
}
```

## Benefits

1. **Single Source of Truth**: All design tokens in one place
2. **Type-Safe**: TypeScript definitions available
3. **Project-Wide**: Available to all components
4. **Maintainable**: Update colors in one place
5. **Consistent**: Ensures design consistency across the project
