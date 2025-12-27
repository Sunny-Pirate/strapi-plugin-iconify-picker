import React, { useEffect, useState, useCallback } from 'react';
import { useIntl } from 'react-intl';
import {
  Field,
  Flex,
  Typography,
  Box,
  Grid,
  TextInput,
  SingleSelect,
  SingleSelectOption,
  Loader,
  TextButton,
} from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';
import { Icon } from '@iconify/react';
import { PLUGIN_ID } from '../pluginId';
import { PaginationFooter } from './PaginationFooter';



const IconifyPickerInput = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } = props;
  const { formatMessage } = useIntl();
  const { get } = useFetchClient();

  const [availableCollections, setAvailableCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [icons, setIcons] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [loadingIcons, setLoadingIcons] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatOrFallback = (descriptor: any, fallback: string) => {
    if (descriptor && descriptor.id) return formatMessage(descriptor);
    if (descriptor && descriptor.defaultMessage) return descriptor.defaultMessage;
    return fallback;
  };

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch inventory
  useEffect(() => {
    let mounted = true;
    setLoadingCollections(true);
    get(`/${PLUGIN_ID}/inventory`)
      .then((res) => {
        if (!mounted) return;
        const available = res.data
          .filter((item: any) => item.isAvailable && item.isEnabled)
          .map((item: any) => item.prefix);
        setAvailableCollections(available);
      })
      .catch((error) => {
        console.error('Failed to fetch Iconify inventory', error);
        if (mounted) setAvailableCollections([]);
      })
      .finally(() => {
        if (mounted) setLoadingCollections(false);
      });
    return () => {
      mounted = false;
    };
  }, [get]);

  // Sync selected collection with value or first available
  useEffect(() => {
    let prefix = '';

    if (value) {
      if (typeof value === 'string' && value.includes(':')) {
        [prefix] = value.split(':');
      } else if (typeof value === 'object' && value.prefix) {
        prefix = value.prefix;
      }
    }

    if (prefix && availableCollections.includes(prefix)) {
      setSelectedCollection(prefix);
      return;
    }

    if (!selectedCollection && availableCollections.length > 0) {
      setSelectedCollection(availableCollections[0]);
    }
  }, [availableCollections, value]);

  // Fetch icons
  useEffect(() => {
    if (!selectedCollection) return;
    let mounted = true;
    setLoadingIcons(true);
    setErrorMessage(null);

    // limit is set to MAX_ICONS to stay responsive
    get(`/${PLUGIN_ID}/icons/${selectedCollection}?q=${encodeURIComponent(debouncedSearch)}`)
      .then((res) => {
        if (!mounted) return;
        setIcons(res.data?.icons ?? []);
      })
      .catch((error) => {
        const message = error?.response?.data || 'Unable to load icons for this collection.';
        console.error(message);
        if (mounted) {
          setErrorMessage(typeof message === 'string' ? message : 'Error loading icons');
          setIcons([]);
        }
      })
      .finally(() => {
        if (mounted) setLoadingIcons(false);
      });
    return () => {
      mounted = false;
    };
  }, [get, selectedCollection, debouncedSearch]);

  // Reset page when search or collection changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCollection, debouncedSearch]);

  const totalPages = Math.ceil(icons.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentIcons = icons.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  const selectIcon = (iconName: string) => {
    if (!selectedCollection) return;
    const nextValue = { prefix: selectedCollection, icon: iconName, value: `${selectedCollection}:${iconName}` };
    onChange({
      target: {
        name,
        type: attribute.type,
        value: nextValue,
      },
    });
  };

  const clearIcon = () => {
    onChange({
      target: {
        name,
        type: attribute.type,
        value: null,
      },
    });
  };

  if (loadingCollections) {
    return (
      <Flex gap={2} direction="column">
        <Typography variant="pi" fontWeight="bold">
          {formatOrFallback(intlLabel, 'Iconify')}
        </Typography>
        <Loader small>Loading collections...</Loader>
      </Flex>
    );
  }

  if (availableCollections.length === 0) {
    return (
      <Flex gap={2} direction="column">
        <Typography variant="pi" fontWeight="bold">
          {formatOrFallback(intlLabel, 'Iconify')}
        </Typography>
        <Typography variant="pi" textColor="neutral600">
          No available Iconify collections. Please check diagnostics or configuration.
        </Typography>
      </Flex>
    );
  }

  return (
    <Field.Root
      name={name}
      id={name}
      required={required}
      hint={props.hint}
      error={props.error}
      ref={ref}
    >
      <Field.Label>{formatOrFallback(intlLabel, 'Iconify')}</Field.Label>
      <Box
        padding={4}
        hasRadius
        background="neutral0"
        borderColor="neutral200"
        borderWidth="1px"
        shadow="tableShadow"
      >
        <Grid.Root gap={4}>
          <Grid.Item col={3} s={12}>
            <Flex paddingBottom={1} width="100%" gap={2} justifyContent="space-between">
              <Typography variant="pi" fontWeight="bold" textColor="neutral600">
                Collection
              </Typography>
              <SingleSelect
                disabled={disabled}
                value={selectedCollection}
                onChange={(v: string | number) => setSelectedCollection(String(v))}
                placeholder="Select collection"
                customizeContent={(value: string) => value}
              >
                {availableCollections.map((col) => (
                  <SingleSelectOption key={col} value={col}>
                    {col}
                  </SingleSelectOption>
                ))}
              </SingleSelect>
            </Flex>
          </Grid.Item>

          <Grid.Item col={9} s={12}>
            <Flex
              width="100%"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Box grow={1}>
                <TextInput
                  name={`${name}-search`}
                  placeholder="Search icons..."
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  disabled={disabled}
                />
              </Box>

              {totalPages > 1 && (
                <PaginationFooter
                  activePage={currentPage}
                  pageCount={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </Flex>
          </Grid.Item>

          <Grid.Item col={3} s={12}>
            <Flex
              background="neutral100"
              hasRadius
              padding={4}
              width="100%"
              height="100%"
              display="flex"
              direction="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              {value ? (() => {
                let displayValue = '';
                let iconName = '';
                if (typeof value === 'string') {
                  displayValue = value;
                  iconName = value.split(':')[1] || value;
                } else if (typeof value === 'object' && value.prefix && value.icon) {
                  displayValue = `${value.prefix}:${value.icon}`;
                  iconName = value.icon;
                }

                if (!displayValue) return (
                  <Typography variant="pi" textColor="neutral500">No selection</Typography>
                );

                return (
                  <Flex direction="column" gap={3} alignItems="center">
                    <Icon icon={displayValue} width={64} height={64} />
                    <Typography variant="delta" fontWeight="bold" style={{ wordBreak: 'break-all' }}>
                      {iconName}
                    </Typography>
                    <TextButton onClick={clearIcon} variant="tertiary" disabled={disabled}>
                      Remove
                    </TextButton>
                  </Flex>
                );
              })() : (
                <Typography variant="pi" textColor="neutral500">No icon selected</Typography>
              )}
            </Flex>
          </Grid.Item>

          <Grid.Item col={9} s={12}>
            {errorMessage && (
              <Box paddingBottom={2}>
                <Typography variant="pi" textColor="danger600">{errorMessage}</Typography>
              </Box>
            )}

            {loadingIcons ? (
              <Flex justifyContent="center" padding={8}>
                <Loader>Loading icons...</Loader>
              </Flex>
            ) : (
              <Box
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
                  gap: '8px',
                  maxHeight: '320px',
                  width: '100%',
                  overflowY: 'auto',
                  paddingRight: '4px',
                }}
              >
                {currentIcons.map((iconName) => {
                  const iconKey = `${selectedCollection}:${iconName}`;
                  let isSelected = false;
                  if (typeof value === 'string') {
                    isSelected = value === iconKey;
                  } else if (typeof value === 'object' && value?.prefix && value?.icon) {
                    isSelected = value.prefix === selectedCollection && value.icon === iconName;
                  }

                  return (
                    <Box
                      key={iconKey}
                      as="button"
                      type="button"
                      padding={2}
                      hasRadius
                      borderWidth="1px"
                      borderColor={isSelected ? 'primary600' : 'neutral200'}
                      background={isSelected ? 'primary100' : 'neutral0'}
                      style={{ cursor: 'pointer', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => selectIcon(iconName)}
                      disabled={disabled}
                      title={iconKey}
                    >
                      <Icon icon={iconKey} width={24} height={24} />
                      <Box paddingTop={1} style={{ width: '100%', overflow: 'hidden' }}>
                        <Typography
                          variant="pi"
                          textColor={isSelected ? 'primary600' : 'neutral600'}
                          style={{
                            fontSize: '10px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            textAlign: 'center'
                          }}
                        >
                          {iconName}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Grid.Item>
        </Grid.Root>
      </Box>
      <Field.Hint />
      <Field.Error />
    </Field.Root>
  );
});

export { IconifyPickerInput };
