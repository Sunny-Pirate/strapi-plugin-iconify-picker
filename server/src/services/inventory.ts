import type { Core } from '@strapi/strapi';

export interface CollectionStatus {
    prefix: string;
    isAvailable: boolean;
    isEnabled: boolean;
    packageName: string;
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async getRuntimeInventory(): Promise<CollectionStatus[]> {
        const config = strapi.config.get('plugin.dls-iconify-picker') as any;
        const allowedCollections: string[] = config?.allowedCollections || [];

        const settingsService = strapi.plugin('dls-iconify-picker').service('settings');
        const settings = await settingsService.getSettings();
        const enabledCollections = settings.enabledCollections || [];

        const inventory: CollectionStatus[] = await Promise.all(
            allowedCollections.map(async (prefix) => {
                const packageName = `@iconify-json/${prefix}`;
                let isAvailable = false;
                try {
                    // Check if the package is resolvable
                    require.resolve(`${packageName}/icons.json`);
                    isAvailable = true;
                } catch (error) {
                    isAvailable = false;
                }

                return {
                    prefix,
                    isAvailable,
                    isEnabled: enabledCollections.includes(prefix),
                    packageName,
                };
            })
        );

        return inventory;
    },
});
