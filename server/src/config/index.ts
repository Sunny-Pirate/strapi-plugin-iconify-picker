export default {
  default: ({ env }) => ({
    allowedCollections: env.array("DLS_AVAILABLE_LOCALES_ICONIFY_COLLECTIONS", ["solar", "lucide", "mdi"]),
  }),
  validator: (config) => {
    if (!config.allowedCollections || !Array.isArray(config.allowedCollections)) {
      throw new Error('allowedCollections must be an array');
    }
  },
};
