import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header.tsx';

export function AuthLayout() {
  return (
    <AppShell
      withBorder={false}
      header={{ height: 80 }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
