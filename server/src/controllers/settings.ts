import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async getSettings(ctx) {
        try {
            const settings = await strapi
                .plugin('dls-iconify-picker')
                .service('settings')
                .getSettings();

            ctx.body = settings;
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    async updateSettings(ctx) {
        const { enabledCollections } = ctx.request.body;

        if (!Array.isArray(enabledCollections)) {
            ctx.throw(400, 'enabledCollections must be an array');
        }

        try {
            await strapi
                .plugin('dls-iconify-picker')
                .service('settings')
                .setSettings({ enabledCollections });

            ctx.body = { ok: true };
        } catch (error) {
            ctx.throw(500, error);
        }
    },
});
