import { Carousel } from '@mantine/carousel';
import { Box, Title } from '@mantine/core';
import { useAuthStore } from '@/features/auth/auth-state';
import { CatalogProductCard } from '@/features/catalog/CatalogProductCard';
import { useFeaturedProducts } from '@/features/catalog/useFeatureProduct';
import { CenterLoader } from '@/shared/ui/CenterLoader';

export function Slider() {
  const clientReady = useAuthStore((s) => s.clientReady);
  const { data, isLoading } = useFeaturedProducts();

  if (!clientReady || isLoading || !data || data.length === 0) {
    return <CenterLoader />;
  }

  return (
    <Box className="carousel" style={{ maxWidth: 1920, width: '100%' }}>
      <Title className="section-title">Featured Selections</Title>
      <Carousel
        height={520}
        slideSize={{
          base: '100%',
          sm: '50%',
          md: '33.333%',
          lg: '25%',
        }}
        slideGap={{ base: 'xs', md: 'md' }}
        slidesToScroll="auto"
        withControls
        controlSize={50}
        controlsOffset="xxs"
        loop
        dragFree
        style={{ overflowY: 'visible' }}
      >
        {data.map((wine) => {
          return (
            <Carousel.Slide key={wine.id} style={{ overflow: 'hidden' }}>
              <CatalogProductCard wine={wine} />
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </Box>
  );
}
