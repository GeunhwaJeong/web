'use client';

import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import ErrorsProvider from 'apps/web/contexts/Errors';

type AppProvidersProps = {
  children: React.ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorsProvider context="web">
      <TooltipProvider>{children}</TooltipProvider>
    </ErrorsProvider>
  );
}
