import type { Core } from '@strapi/strapi';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase
  const pluginConfig = strapi.config.get('plugin::dls-iconify-picker');
  strapi.log.info('Bootstrap\nPlugin config:\n\n', JSON.stringify(pluginConfig, null, 2));
};

export default bootstrap;
