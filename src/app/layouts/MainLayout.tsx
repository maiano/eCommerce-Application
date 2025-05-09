import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export function MainLayout() {
  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 110 }}
      withBorder={false}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
