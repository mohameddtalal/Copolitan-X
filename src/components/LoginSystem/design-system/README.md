# Login System Design System

This design system provides a centralized, maintainable structure for the login system components.

## Structure

```
design-system/
├── colors.ts              # TypeScript color definitions
├── useColors.ts          # Utility functions for using colors
├── fonts.css             # Font utility classes (legacy, fonts are in globals.css)
├── login-base.css        # Base CSS with CSS variables (legacy)
├── shared-styles.module.css  # Shared CSS module styles (legacy)
├── theme-styles.module.css   # Theme CSS variables (legacy)
├── LoginCard.tsx         # Base card component wrapper
└── index.ts              # Exports
```

## Colors

All colors are defined as CSS variables in `globals.css`:

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

Use CSS variables directly:

```css
.myComponent {
  color: var(--color-primary);
  background-color: var(--light-bg);
  border: 1px solid var(--light-border);
}
```

### In Components

Use CSS variables in inline styles:

```tsx
<div style={{ color: 'var(--color-primary)' }}>
  Text
</div>
```

Or use the utility:

```tsx
import { getColor, themeColors } from '@/components/LoginSystem/design-system';

<div style={{ color: getColor('primary') }}>
  Text
</div>

<div style={{ backgroundColor: themeColors.light.bg }}>
  Content
</div>
```

## Fonts

Fonts are defined in `globals.css` with utility classes:

- `.font-gtwalsheim` - GT Walsheim Regular (400)
- `.font-gtwalsheim-semibold` - GT Walsheim Medium (600)
- `.font-lora` - Lora
- `.lora-semibold-italic` - Lora SemiBold Italic (600)

In CSS, use directly:
```css
.myText {
  font-family: "GT Walsheim";
  font-weight: 600; /* Medium */
  font-style: normal;
}

.myHeading {
  font-family: "Lora";
  font-weight: 600;
  font-style: italic;
}
```

## Component Structure

Each component CSS file (`Login.module.css`, `ResetPassword.module.css`, etc.) now:

1. Uses CSS variables for all colors
2. Shares common styles through CSS variables
3. Handles margins at the component level where needed
4. Maintains dark/white variants using CSS variables

## Benefits

1. **Single Source of Truth**: All colors defined in `globals.css`
2. **Easy Theme Switching**: Change CSS variables to update themes
3. **Maintainable**: Update colors in one place
4. **Type-Safe**: TypeScript definitions in `colors.ts`
5. **No Duplication**: Shared styles use CSS variables

## Migration Notes

- All hex colors have been replaced with CSS variables
- Components maintain the same structure and functionality
- Margins are handled at component level for flexibility
- Font definitions centralized in `globals.css`
