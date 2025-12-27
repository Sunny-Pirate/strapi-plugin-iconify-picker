import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    async getIcons(ctx) {
        const { prefix } = ctx.params;
        const { q, limit, offset } = ctx.query;

        try {
            const result = await strapi
                .plugin('dls-iconify-picker')
                .service('iconify')
                .getIcons(
                    prefix,
                    q || '',
                    limit ? parseInt(limit as string, 10) : 10000,
                    offset ? parseInt(offset as string, 10) : 0
                );

            ctx.body = result;
        } catch (error) {
            ctx.throw(400, error.message);
        }
    },
});
