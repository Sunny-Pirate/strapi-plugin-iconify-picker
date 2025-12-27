# Strapi Iconify Picker

![Iconify Picker Usage](public/usage.png)

**The icons you love. The workflow you deserve.**

Bringing the power of 150,000+ icons directly into your Strapi admin panel. Integrating seamlessly with the Iconify ecosystem, it offers a design-first experience for content editors and developers alike.

[![Strapi](https://img.shields.io/badge/Strapi-v5-2F2E8B?style=flat&logo=strapi)](https://strapi.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Usage](#usage)
- [Frontend Implementation](#frontend-implementation)

## Features

- 🎨 **Infinite Choice**: Access every collection from Material Design, Lucide, Phosphor, Solar, and more.
- ⚡ **Instant Search**: Find the perfect icon in milliseconds, even across massive sets.
- 👁️ **Visual Clarity**: Large, crisp previews ensure you never pick the wrong asset.
- 👮 **Governance**: You decide which sets are available, maintaining your brand's design system.
- 🧱 **Clean Data**: Stores a lightweight JSON object. No bloat. No raw SVG clutter in your DB.

## Quick Start

### 1. Install

```bash
npm install dls-iconify-picker
```

### 2. Configure

Add the plugin to your `config/plugins.ts` file to enable it.

```typescript
export default () => ({
  'dls-iconify-picker': {
    enabled: true,
  },
});
```

### 3. Build

```bash
npm run build && npm run develop
```

## Configuration

Control is everything. Use the plugin setting page to toggle icon sets on or off, ensuring your editors stick to the brand guidelines.

1. Navigate to **Settings** -> **Iconify Picker**.
2. Enable the collections you want to use.

![Configuration Screen](public/config.png)

## Usage

Designed for flow. The 2x2 grid layout keeps context clear and actions effortless.

### 1. Select Collection

Choose the right aesthetic for your content from the curated list.

### 2. Search & Browse

Type to filter. Use the pagination to explore. It feels instant because it is.

### 3. Pick & Preview

Click an icon. See it large. Confirm it's the one.

## Frontend Implementation

We believe in clean data. The field stores a structured JSON object, giving you total flexibility on the frontend.

**Data Structure:**

```json
{
  "prefix": "solar",
  "icon": "box-bold",
  "value": "solar:box-bold"
}
```

### React / Next.js Example

Using the `@iconify/react` component makes rendering effortless.

```tsx
import { Icon } from '@iconify/react';

const MyComponent = ({ iconData }) => {
  if (!iconData) return null;

  return (
    <Icon
      icon={iconData.value}
      width={24}
      height={24}
      className="text-primary-500"
    />
  );
};
```

## License

MIT License
