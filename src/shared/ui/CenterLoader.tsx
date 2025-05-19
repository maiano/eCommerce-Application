import { Loader, Center, Overlay } from '@mantine/core';
import { useEffect, useState } from 'react';

interface CenterLoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function CenterLoader({ size = 'md' }: CenterLoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <>
      <Overlay
        blur={1}
        backgroundOpacity={0.6}
        style={{
          opacity: mounted ? 1 : 0,
          transition: 'opacity 200ms ease',
          zIndex: 1000,
        }}
      />
      <Center
        pos="fixed"
        inset={0}
        style={{
          opacity: mounted ? 1 : 0,
          transition: 'opacity 200ms ease',
          zIndex: 1001,
        }}
      >
        <Loader size={size} />
      </Center>
    </>
  );
}
