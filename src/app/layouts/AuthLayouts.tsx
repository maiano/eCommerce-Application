import { AppShell } from '@mantine/core';
import { Header } from '@/components/Header/Header.tsx';
import { AnimatedOutlet } from '@/shared/ui/AnimatedOutlet';

export function AuthLayout() {
  return (
    <AppShell withBorder={false} header={{ height: 80 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <AnimatedOutlet />
      </AppShell.Main>
    </AppShell>
  );
}
