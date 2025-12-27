import type { Core } from '@strapi/strapi';

export interface IconListResult {
    prefix: string;
    icons: string[];
    total: number;
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async getIcons(prefix: string, query: string = '', limit: number = 100, offset: number = 0): Promise<IconListResult> {
        const inventoryService = strapi.plugin('dls-iconify-picker').service('inventory');
        const inventory = await inventoryService.getRuntimeInventory();

        const collection = inventory.find(c => c.prefix === prefix);

        if (!collection || !collection.isAvailable) {
            throw new Error(`Collection ${prefix} is not available.`);
        }

        if (!collection.isEnabled) {
            throw new Error(`Collection ${prefix} is not enabled in governance.`);
        }

        try {
            const iconData = require(`${collection.packageName}/icons.json`);
            let icons = Object.keys(iconData.icons);

            if (query) {
                const lowerQuery = query.toLowerCase();
                icons = icons.filter(name => name.toLowerCase().includes(lowerQuery));
            }

            const total = icons.length;
            const paginatedIcons = icons.slice(offset, offset + limit);

            return {
                prefix,
                icons: paginatedIcons,
                total,
            };
        } catch (error) {
            strapi.log.error(`Failed to load icons for ${prefix}: ${error.message}`);
            throw new Error(`Failed to load icons for ${prefix}`);
        }
    },
});
