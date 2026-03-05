# Shlink frontend kit

Design system, component library and utilities for Shlink React frontend projects.

## Installation

```shell
npm install @shlinkio/shlink-frontend-kit
```

## Usage

```tsx
import { Button, useToggle } from '@shlinkio/shlink-frontend-kit';
import './tailwind.css';

export const App = () => {
  const { flag, toggle } = useToggle();
  
  return (
    <div className="flex flex-col gap-3">
      <p>The flag is {flag ? 'true' : 'false'}</p>
      <Button onClick={toggle}>Click me</Button>
    </>
  )
};
```

## Tailwind

This library provides tailwindcss-based components. To use them make sure you add the following instructions to your tailwind stylesheet:

```css
@import 'tailwindcss';

/* Add these two lines */
@source '../node_modules/@shlinkio/shlink-frontend-kit';
@import '@shlinkio/shlink-frontend-kit/tailwind.preset.css';
```
