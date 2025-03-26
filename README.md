# Shlink frontend kit

React components and utilities for Shlink frontend projects

## Tailwind alternatives

This library provides some tailwindcss-based components. To use them make sure to import components from `@shlinkio/shlink-frontend-kit/tailwind` and you add the following instructions to your tailwind stylesheet:

```css
@import 'tailwindcss' prefix(tw);

/* Add these two lines */
@source '../node_modules/@shlinkio/shlink-frontend-kit';
@import '@shlinkio/shlink-frontend-kit/tailwind.preset.css';
```
