import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export function ErrorLayout() {
  return (
    <AppShell header={{ height: 60 }} withBorder={false}>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
