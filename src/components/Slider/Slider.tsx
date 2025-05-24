import { Carousel } from '@mantine/carousel';
import { Box, Title } from '@mantine/core';
import { ProductCard } from '@/components/Card/ProductCard.tsx';
import type { Wine } from '@/types/types.tsx';
import { wines } from '@/types/types.tsx';


export function Slider() {

  return (
    <Box className="carousel" style={{ maxWidth: 1920, width: '100%' }}>
      <Title className="section-title">Featured Selections</Title>
      <Carousel
        height={500}
        slideSize={{
          base: '100%',
          sm: '50%',
          md: '33.333%',
          lg: '25%',
        }}
        slideGap={{ base: 'xs', md: 'md' }}
        align="start"
        slidesToScroll="auto"
        withControls
        controlSize={50}
        controlsOffset="xxs"
        loop
        dragFree
      >
        {wines.map((wine: Wine, index: number ) => (
          <Carousel.Slide key={index}>
            <ProductCard
              wine={wine}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}
