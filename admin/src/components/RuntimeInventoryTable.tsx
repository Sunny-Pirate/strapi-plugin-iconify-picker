import React from 'react';
import { Box, Typography, Table, Thead, Tbody, Tr, Th, Td, Status, Toggle } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';

interface CollectionStatus {
    prefix: string;
    isAvailable: boolean;
    isEnabled: boolean;
    packageName: string;
}

interface RuntimeInventoryTableProps {
    inventory: CollectionStatus[];
    selectedPrefix: string | null;
    saving: boolean;
    onSelectCollection: (prefix: string, isAvailable: boolean) => void;
    onToggle: (prefix: string, isEnabled: boolean) => void;
}

export const RuntimeInventoryTable: React.FC<RuntimeInventoryTableProps> = ({
    inventory,
    selectedPrefix,
    saving,
    onSelectCollection,
    onToggle,
}) => {
    return (
        <Flex direction="column" alignItems="flex-start" padding={6} background="neutral0" hasRadius shadow="filterShadow" grow={0}>
            <Box marginBottom={4}>
                <Typography variant="beta" as="h2">
                    Runtime Inventory
                </Typography>
            </Box>
            <Table colCount={4} rowCount={inventory.length}>
                <Thead>
                    <Tr>
                        <Th>
                            <Typography variant="sigma">Collection</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Availability</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Governance (Enabled)</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Package</Typography>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {inventory.map((item) => (
                        <Tr
                            key={item.prefix}
                            onClick={() => onSelectCollection(item.prefix, item.isAvailable)}
                            style={{
                                cursor: item.isAvailable ? 'pointer' : 'default',
                                backgroundColor: selectedPrefix === item.prefix ? '#f0f0ff' : undefined,
                            }}
                        >
                            <Td>
                                <Typography textColor="neutral800" fontWeight="bold">
                                    {item.prefix}
                                </Typography>
                            </Td>
                            <Td>
                                <Status variant={item.isAvailable ? 'success' : 'danger'} size={"S"}>
                                    <Typography>
                                        {item.isAvailable ? 'Available' : 'Missing'}
                                    </Typography>
                                </Status>
                            </Td>
                            <Td>
                                <Toggle
                                    checked={item.isEnabled}
                                    onLabel="On"
                                    offLabel="Off"
                                    disabled={!item.isAvailable || saving}
                                    onChange={(e: any) => {
                                        e.stopPropagation();
                                        onToggle(item.prefix, e.target.checked);
                                    }}
                                />
                            </Td>
                            <Td>
                                <Flex direction="column" alignItems="flex-start">
                                    <Typography textColor="neutral600" variant="pi">
                                        {item.packageName}
                                    </Typography>
                                    {!item.isAvailable && (
                                        <Typography variant="pi" textColor="danger600">
                                            Install it to enable
                                        </Typography>
                                    )}
                                </Flex>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Flex>
    );
};
