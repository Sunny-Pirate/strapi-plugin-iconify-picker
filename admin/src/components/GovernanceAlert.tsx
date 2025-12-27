import React from 'react';
import { Alert, Box } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';

interface GovernanceAlertProps {
    onDismiss?: () => void;
    alignSelf?: string;
}

export const GovernanceAlert: React.FC<GovernanceAlertProps> = ({ onDismiss }) => {
    return (
        <Box marginBottom={6} width="100%">
            <Flex direction="column" alignItems="center">
                <Alert
                    title="Governance Note"
                    variant="info"
                    closeLabel="Close alert"
                    onClose={onDismiss}
                >
                    Only collections that are both <strong>Allowed</strong> (in config) and <strong>Available</strong> (installed) can be enabled for editors.
                </Alert>
            </Flex>
        </Box>
    );
};
