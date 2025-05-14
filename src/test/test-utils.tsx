import { MantineProvider } from '@mantine/core';
import { render as testingLibraryRender } from '@testing-library/react';
import type { ReactNode } from 'react';
import { theme } from '@/app/theme';

export function customRender(ui: ReactNode) {
  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <MantineProvider theme={theme}>{children}</MantineProvider>
    ),
  });
}
