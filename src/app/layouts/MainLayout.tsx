import { AppShell } from '@mantine/core';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { AnimatedOutlet } from '@/shared/ui/AnimatedOutlet';

export function MainLayout() {
  return (
    <AppShell
      header={{ height: 80 }}
      footer={{ height: 110 }}
      withBorder={false}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <AnimatedOutlet />
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
