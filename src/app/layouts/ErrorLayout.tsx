import { AppShell } from '@mantine/core';
import { Header } from '@/components/Header/Header';
import { AnimatedOutlet } from '@/shared/ui/AnimatedOutlet';

export function ErrorLayout() {
  return (
    <AppShell header={{ height: 60 }} withBorder={false}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <AnimatedOutlet />
      </AppShell.Main>
    </AppShell>
  );
}
