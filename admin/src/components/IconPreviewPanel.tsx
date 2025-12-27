import React, { useState, useMemo } from 'react';
import { Box, Flex, Typography, Loader, SingleSelect, SingleSelectOption, PreviousLink, PageLink, NextLink, Dots } from '@strapi/design-system';
import { Icon } from '@iconify/react';
import { Pagination } from '@strapi/design-system';

interface IconPreviewPanelProps {
    selectedPrefix: string | null;
    previewIcons: string[];
    loadingPreview: boolean;
}

const PAGE_SIZE_OPTIONS = [20, 50, 100, 200];

export const IconPreviewPanel: React.FC<IconPreviewPanelProps> = ({
    selectedPrefix,
    previewIcons,
    loadingPreview,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    // Reset to page 1 when collection changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedPrefix]);

    const totalPages = Math.ceil(previewIcons.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentIcons = previewIcons.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (value: string | number) => {
        setPageSize(Number(value));
        setCurrentPage(1); // Reset to first page when changing page size
    };

    // Generate page numbers to display
    const pageNumbers = useMemo(() => {
        const pages: (number | 'dots')[] = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Calculate range around current page
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're near the start or end
            if (currentPage <= 3) {
                end = 4;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - 3;
            }

            // Add dots and middle pages
            if (start > 2) pages.push('dots');
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (end < totalPages - 1) pages.push('dots');

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    }, [currentPage, totalPages]);

    return (
        <Box padding={6} background="neutral0" hasRadius shadow="filterShadow" grow={1}>
            <Flex direction="row" alignItems="center" justifyContent="space-between" marginBottom={4}>
                <Typography variant="beta" as="h2">
                    Icon Preview
                </Typography>
                {selectedPrefix && !loadingPreview && previewIcons.length > 0 && (
                    <Flex direction="row" gap={3} alignItems="center">
                        {totalPages > 1 && (
                            <Flex justifyContent="center" gap={1} marginRight={4}>
                                <Pagination>
                                    <PreviousLink
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    >
                                        Previous
                                    </PreviousLink>
                                    {pageNumbers.map((page, index) => {
                                        if (page === 'dots') {
                                            return <Dots key={`dots-${index}`}>...</Dots>;
                                        }
                                        return (
                                            <PageLink
                                                key={page}
                                                number={page}
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page}
                                            </PageLink>
                                        );
                                    })}
                                    <NextLink
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    >
                                        Next
                                    </NextLink>
                                </Pagination>
                            </Flex>
                        )}
                        <Typography variant="pi" textColor="neutral600">
                            Per page:
                        </Typography>
                        <SingleSelect
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            size="S"
                        >
                            {PAGE_SIZE_OPTIONS.map((size) => (
                                <SingleSelectOption key={size} value={size}>
                                    {size}
                                </SingleSelectOption>
                            ))}
                        </SingleSelect>
                    </Flex>
                )}
            </Flex>

            {!selectedPrefix ? (
                <Flex justifyContent="center" paddingTop={6}>
                    <Typography variant="omega" textColor="neutral600">
                        Select a collection to preview icons
                    </Typography>
                </Flex>
            ) : loadingPreview ? (
                <Flex justifyContent="center" paddingTop={6}>
                    <Loader small>Loading icons...</Loader>
                </Flex>
            ) : previewIcons.length === 0 ? (
                <Flex justifyContent="center" paddingTop={6}>
                    <Typography variant="omega" textColor="neutral600">
                        No icons found in this collection
                    </Typography>
                </Flex>
            ) : (
                <Box>
                    <Box marginBottom={3}>
                        <Typography variant="omega" textColor="neutral600">
                            {selectedPrefix} (showing {startIndex + 1}-{Math.min(endIndex, previewIcons.length)} of {previewIcons.length} icons)
                        </Typography>
                    </Box>
                    <Box
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: '12px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            marginBottom: '16px',
                        }}
                    >
                        {currentIcons.map((iconName) => {
                            const iconKey = `${selectedPrefix}:${iconName}`;
                            return (
                                <Flex
                                    key={iconKey}
                                    direction="column"
                                    alignItems="center"
                                    gap={2}
                                    padding={2}
                                    hasRadius
                                    background="neutral100"
                                    title={iconKey}
                                >
                                    <Icon icon={iconKey} width={32} height={32} />
                                    <Typography
                                        variant="pi"
                                        textColor="neutral700"
                                        style={{
                                            fontSize: '10px',
                                            textAlign: 'center',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {iconName}
                                    </Typography>
                                </Flex>
                            );
                        })}
                    </Box>


                </Box>
            )}
        </Box>
    );
};
