import {
  Box,
  Flex,
  Grid,
  Main,
  Typography,
  Loader,
} from '@strapi/design-system';
import { Page, useFetchClient, useNotification } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';
import React, { useEffect, useState, useCallback } from 'react';
import { getTranslation } from '../utils/getTranslation';
import { PLUGIN_ID } from '../pluginId';
import { GovernanceAlert } from '../components/GovernanceAlert';
import { RuntimeInventoryTable } from '../components/RuntimeInventoryTable';
import { IconPreviewPanel } from '../components/IconPreviewPanel';

interface CollectionStatus {
  prefix: string;
  isAvailable: boolean;
  isEnabled: boolean;
  packageName: string;
}

const HomePage = () => {
  const { formatMessage } = useIntl();
  const { get, put } = useFetchClient();
  const { toggleNotification } = useNotification();
  const [inventory, setInventory] = useState<CollectionStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedPrefix, setSelectedPrefix] = useState<string | null>(null);
  const [previewIcons, setPreviewIcons] = useState<string[]>([]);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const fetchInventory = useCallback(async () => {
    try {
      const { data } = await get(`/${PLUGIN_ID}/inventory`);
      setInventory(data);
      setLoading(false);
    } catch (err: any) {
      toggleNotification({
        type: 'warning',
        message: err.message || 'Failed to fetch inventory',
      });
      setLoading(false);
    }
  }, [get, toggleNotification]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleToggle = async (prefix: string, isEnabled: boolean) => {
    setSaving(true);
    try {
      const newEnabledCollections = inventory
        .filter((item) => (item.prefix === prefix ? isEnabled : item.isEnabled))
        .map((item) => item.prefix);

      await put(`/${PLUGIN_ID}/settings`, {
        enabledCollections: newEnabledCollections,
      });

      setInventory((prev) =>
        prev.map((item) =>
          item.prefix === prefix ? { ...item, isEnabled } : item
        )
      );

      toggleNotification({
        type: 'info',
        message: `Collection ${prefix} ${isEnabled ? 'enabled' : 'disabled'}`,
      });
    } catch (err: any) {
      toggleNotification({
        type: 'warning',
        message: err.message || 'Failed to update settings',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSelectCollection = useCallback(async (prefix: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    setSelectedPrefix(prefix);
    setLoadingPreview(true);
    try {
      const { data } = await get(`/${PLUGIN_ID}/icons/${prefix}`);
      setPreviewIcons(data.icons || []);
    } catch (err) {
      console.error('Failed to load icons for preview', err);
      setPreviewIcons([]);
    } finally {
      setLoadingPreview(false);
    }
  }, [get]);

  if (loading) {
    return (
      <Main>
        <Flex justifyContent="center" paddingTop={10}>
          <Loader>Loading diagnostics...</Loader>
        </Flex>
      </Main>
    );
  }

  return (
    <Main aria-busy={loading || saving}>
      <Page.Title>
        {formatMessage({ id: getTranslation('plugin.name'), defaultMessage: 'Iconify Picker' })}
      </Page.Title>
      <Box padding={8}>
        <Flex direction="column" gap={6} alignItems="flex-start">
          <Box>
            <Typography variant="alpha" as="h1">
              {formatMessage({ id: getTranslation('plugin.name'), defaultMessage: 'Iconify Picker' })}
            </Typography>
            <Typography variant="epsilon" textColor="neutral600">
              Diagnostics and Governance
            </Typography>
          </Box>

          <GovernanceAlert alignSelf="center" />

          <Flex direction="row" gap={6} alignItems="flex-start" justifyContent="flex-start" width="100%">
            <RuntimeInventoryTable
              inventory={inventory}
              selectedPrefix={selectedPrefix}
              saving={saving}
              onSelectCollection={handleSelectCollection}
              onToggle={handleToggle}
            />
            <IconPreviewPanel
              selectedPrefix={selectedPrefix}
              previewIcons={previewIcons}
              loadingPreview={loadingPreview}
            />

          </Flex>
        </Flex>
      </Box>
    </Main>
  );
};

export { HomePage };
