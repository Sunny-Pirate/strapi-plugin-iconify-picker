export default () => ({
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/inventory',
      handler: 'inventory.getInventory',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/icons/:prefix',
      handler: 'icons.getIcons',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/settings',
      handler: 'settings.getSettings',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'PUT',
      path: '/settings',
      handler: 'settings.updateSettings',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
});
