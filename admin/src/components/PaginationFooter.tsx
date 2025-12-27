import React, { useMemo } from 'react';
import { Flex, Typography, SingleSelect, SingleSelectOption, Pagination, PreviousLink, PageLink, NextLink, Dots } from '@strapi/design-system';

interface PaginationFooterProps {
    activePage: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    pageSize?: number;
    onPageSizeChange?: (value: string | number) => void;
    pageSizeOptions?: number[];
}

export const PaginationFooter: React.FC<PaginationFooterProps> = ({
    activePage,
    pageCount,
    onPageChange,
    pageSize,
    onPageSizeChange,
    pageSizeOptions,
}) => {
    const pageNumbers = useMemo(() => {
        const pages: (number | 'dots')[] = [];
        const maxPagesToShow = 5;

        if (pageCount <= maxPagesToShow) {
            for (let i = 1; i <= pageCount; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            let start = Math.max(2, activePage - 1);
            let end = Math.min(pageCount - 1, activePage + 1);

            if (activePage <= 3) {
                end = 4;
            } else if (activePage >= pageCount - 2) {
                start = pageCount - 3;
            }

            if (start > 2) pages.push('dots');
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (end < pageCount - 1) pages.push('dots');

            pages.push(pageCount);
        }
        return pages;
    }, [activePage, pageCount]);

    if (pageCount <= 1 && !pageSize) return null;

    return (
        <Flex direction="row" gap={3} alignItems="center">
            {pageCount > 1 && (
                <Flex justifyContent="center" gap={1}>
                    <Pagination activePage={activePage} pageCount={pageCount}>
                        <PreviousLink onClick={() => onPageChange(Math.max(1, activePage - 1))}>
                            Previous
                        </PreviousLink>
                        {pageNumbers.map((page, index) => {
                            if (page === 'dots') return <Dots key={`dots-${index}`}>...</Dots>;
                            return (
                                <PageLink key={page} number={page} onClick={() => onPageChange(page)}>
                                    {page}
                                </PageLink>
                            );
                        })}
                        <NextLink onClick={() => onPageChange(Math.min(pageCount, activePage + 1))}>
                            Next
                        </NextLink>
                    </Pagination>
                </Flex>
            )}

            {pageSize && onPageSizeChange && pageSizeOptions && (
                <Flex direction="row" gap={2} alignItems="center">
                    {/* Added some margin if pagination is also present, though Flex gap handles most.
                The original code had marginRight={4} on the pagination flex wrapper.
             */}
                    <Typography variant="pi" textColor="neutral600">
                        Per page:
                    </Typography>
                    <SingleSelect value={pageSize} onChange={onPageSizeChange} size="S">
                        {pageSizeOptions.map((size) => (
                            <SingleSelectOption key={size} value={size}>
                                {size}
                            </SingleSelectOption>
                        ))}
                    </SingleSelect>
                </Flex>
            )}
        </Flex>
    );
};
