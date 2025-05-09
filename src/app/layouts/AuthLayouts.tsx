import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <AppShell withBorder={false}>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
