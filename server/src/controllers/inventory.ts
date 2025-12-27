import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async getInventory(ctx) {
        try {
            const inventory = await strapi
                .plugin('dls-iconify-picker')
                .service('inventory')
                .getRuntimeInventory();

            ctx.body = inventory;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
});
