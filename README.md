# Strapi Iconify Picker

**Design at the speed of thought.**

Bring the Iconify ecosystem into your Strapi workflow. Effortless search. Instant previews. Uncompromising performance.

[![Strapi](https://img.shields.io/badge/Strapi-v5-2F2E8B?style=flat&logo=strapi)](https://strapi.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## The Experience

We built the Iconify Picker to be invisible. It steps out of your way, letting your creativity flow.

* **A Larger Library**: Browse icons from installed Iconify collections across major icon sets.
* **Instant Clarity**: Large, sharp previews to help you choose with confidence.
* **Absolute Control**: Admins curate available sets for consistent, brand-safe choices.
* **The Power of ‘None’**: Remove an icon as quickly as you add one.
* **Clean by Design**: Structured JSON storage keeps content portable and predictable.

This plugin provides a dedicated field input to pick an Iconify icon and store it as JSON in Strapi.

![Strapi Iconify Picker](docs/modules/ROOT/assets/images/guide-step-11.png)

## Quick Start

### 1. Install

<details>
<summary>Click to view installation commands</summary>

```bash
yarn add @sunny-pirate/strapi-plugin-iconify-picker
# or
npm install @sunny-pirate/strapi-plugin-iconify-picker
```

</details>

### 2. Configure

Add to your `config/plugins.ts`:

```typescript
type StrapiEnv = {
  array: (key: string, defaultValue?: string[]) => string[];
};

export default ({ env }: { env: StrapiEnv }) => ({
  '@sunny-pirate/strapi-plugin-iconify-picker': {
    enabled: true,
    config: {
      collections: env.array('DLS_ICON_COLLECTIONS', ['solar', 'logos', 'flag', 'lucide']),
    },
  },
});
```

### 3. Build

<details>
<summary>Click to view build commands</summary>

```bash
yarn build && yarn develop
# or
npm run build && npm run develop
```

</details>

## Governance & Configuration

Precision starts at the foundation. Choose which collections are available to your team through environment variables or direct configuration.

### Requirements

* Strapi v5

### Environment Variables

| Variable               | Description                              | Default                   |
| :--------------------- | :--------------------------------------- | :------------------------ |
| `DLS_ICON_COLLECTIONS` | Comma-separated list of Iconify prefixes | `solar,logos,flag,lucide` |

## Usage

Designed for focus. The interface puts your content first.

### Visual Workflow

| 🔍 **Search Experience**                                     | 👁️ **Final Selection**                                       |
| :----------------------------------------------------------- | :------------------------------------------------------------ |
| ![Search](docs/modules/ROOT/assets/images/guide-step-12.png) | ![Preview](docs/modules/ROOT/assets/images/guide-step-11.png) |

| ⚙️ **Governance & Control**                                         |
| :------------------------------------------------------------------ |
| ![Configuration](docs/modules/ROOT/assets/images/guide-step-06.png) |

1. **Selection**: Select from curated collections tailored to your brand.
2. **Discovery**: High-performance search helps you find the right icon in seconds.
3. **Preview**: Instant visual feedback ensures it fits your design.
4. **Refinement**: One-click removal keeps your workflow clean and decisive.

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

## Iconify & Icon Sets Licensing

This plugin integrates with the Iconify ecosystem but is **not** an official or endorsed Iconify product.

* **Uses Iconify ecosystem**: The plugin uses Iconify libraries to render icons.
* **Icon sets have their own licenses**: Each icon collection has its own license and attribution requirements.
* **No icon sets bundled**: This plugin does not ship icon data or icon set packages. You are responsible for selecting and using icon sets in compliance with their licenses.
* **If you distribute icon sets**: Include the specific licenses and attributions for those sets in your product or repo.
* **No implied affiliation**: Do not present this plugin as an official Iconify product or imply endorsement.

## License

MIT License

