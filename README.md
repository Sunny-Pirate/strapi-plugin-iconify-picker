# Strapi Plugin Iconify Picker

A custom field for Strapi v5 that allows editors to select icons from [Iconify](https://iconify.design/) collections. Stores the selected icon as a JSON object.

## Features

- **Iconify Integration**: Browse and search icons from any Iconify collection (e.g., Solar, Lucide, Material Design).
- **Search & Pagination**: Efficiently find icons with a search bar and paginated grid.
- **Visual Preview**: Large preview of the selected icon.
- **Configurable**: Choose which icon collections are available to editors.
- **JSON Storage**: Saves icon data as a structured JSON object: `{ prefix, icon, value }`.

## Installation

```bash
npm install dls-iconify-picker
```

## Configuration

1. **Add Custom Field**: In your Content Type Builder, add a "JSON" field and select "Iconify Picker" from the custom field options.
2. **Plugin Settings**: Go to `Settings -> Iconify Picker` (or the Plugin Homepage) to view available collections.
3. **Enable Collections**: You can enable/disable specific collections in the config or via the diagnostics page.

`config/plugins.ts`:

```typescript
export default () => ({
  'dls-iconify-picker': {
    enabled: true,
    config: {
      // optional configuration
    },
  },
});
```

![Configuration Screen](file:///home/dreamux/.gemini/antigravity/brain/c9f8ae13-4b6f-4e1d-b30b-1ef259b709dc/plugin_configuration_screen_1766854246498.png)

## Usage

In the Content Manager:

1. **Select Collection**: Choose an icon set from the dropdown (e.g., `solar`).
2. **Search**: Type to filter icons.
3. **Select**: Click an icon to select it.
4. **Preview**: The selected icon appears in the preview box.

![Usage Screenshot](file:///home/dreamux/.gemini/antigravity/brain/c9f8ae13-4b6f-4e1d-b30b-1ef259b709dc/grid_fix_verified_1766853726518.png)

## Developer Guide

### Data Format

The field saves data in the following format:

```json
{
  "prefix": "solar",
  "icon": "box-bold",
  "value": "solar:box-bold"
}
```

### TypeScript Interface

```typescript
interface IconifyValue {
  prefix: string;
  icon: string;
  value: string; // prefix:icon
}
```
