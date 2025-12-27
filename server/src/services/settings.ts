import type { Core } from '@strapi/strapi';

export interface PluginSettings {
    enabledCollections: string[];
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async getSettings(): Promise<PluginSettings> {
        const store = strapi.store({
            type: 'plugin',
            name: 'dls-iconify-picker',
        });

        const settings = await store.get({ key: 'settings' });

        return (
            (settings as PluginSettings) || {
                enabledCollections: [],
            }
        );
    },

    async setSettings(settings: PluginSettings): Promise<void> {
        const store = strapi.store({
            type: 'plugin',
            name: 'dls-iconify-picker',
        });

        await store.set({
            key: 'settings',
            value: settings,
        });
    },
});
