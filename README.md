# Strapi Iconify Picker

![Strapi Iconify Picker](docs/modules/ROOT/assets/images/strapi-iconify-picker-usage.png)

**Design at the speed of thought.**

Unlock the power of 150,000+ icons within your Strapi content workflow. Effortless search. Instant previews. uncompromising performance.

[![Strapi](https://img.shields.io/badge/Strapi-v5-2F2E8B?style=flat&logo=strapi)](https://strapi.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## The Experience

We built the Iconify Picker to be invisible. It steps out of your way, letting your creativity flow.

* **Infinite Canvas**: Access every major icon set—Material, Lucide, Phosphor, Solar, and more.
* **Instant Clarity**: Large, sharp previews ensuring you pick the perfect asset every time.
* **Precision Control**: Admins curate the available sets, ensuring brand consistency across the board.
* **Featherlight**: Stores a minimal JSON object. No bloating your database with raw SVG data.

## Quick Start

### 1. Install

```bash
npm install dls-iconify-picker
```

### 2. Configure

Add to your `config/plugins.ts`:

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

## Usage

Designed for focus. The interface puts your content first.

### Visual Workflow

| 🔍 **Search & Filter** | 👁️ **Instant Preview** |
| :--- | :--- |
| ![Search](docs/modules/ROOT/assets/images/guide-step-07.png) | ![Preview](docs/modules/ROOT/assets/images/strapi-iconify-picker-usage.png) |

| ⚙️ **Governance** |
| :--- |
| ![Configuration](docs/modules/ROOT/assets/images/strapi-iconify-picker-configuration.png) |

1. **Selection**: Choose from curated collections.
2. **Discovery**: High-performance search helps you find the perfect icon in seconds.
3. **Preview**: Instant visual feedback ensures your selection matches your design.

## Architecture

Built with performance and scalability in mind.

### Data Model

We store data in a clean, portable JSON format:

```json
{
  "prefix": "solar",
  "icon": "box-bold",
  "value": "solar:box-bold"
}
```

For detailed architectural diagrams (Class, Sequence, ER), please refer to the [Technical Documentation](docs/modules/ROOT/pages/iconify-picker.adoc).

## License

MIT License
