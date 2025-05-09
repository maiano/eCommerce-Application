import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';

export function ErrorLayout() {
  return (
    <AppShell header={{ height: 60 }} withBorder={false}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
