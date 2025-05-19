import { Carousel } from '@mantine/carousel';
import { Container, Box, Title, Text } from '@mantine/core';

export function Slider() {
  const wines = [
    {
      title: 'Chardonnay',
      description: 'Rich and buttery, a classic white wine',
      imageClass: 'card__image--chardonnay',
    },
    {
      title: 'Pinot Noir',
      description: 'Light-bodied red with notes of cherry and raspberry',
      imageClass: 'card__image--pinot',
    },
    {
      title: 'Cabernet Sauvignon',
      description: 'Full-bodied red with dark fruit and oak flavors',
      imageClass: 'card__image--cabernet',
    },
    {
      title: 'Sauvignon Blanc',
      description: 'Crisp and refreshing white with citrus notes',
      imageClass: 'card__image--sauvignon',
    },
    {
      title: 'Chardonnay',
      description: 'Rich and buttery, a classic white wine',
      imageClass: 'card__image--chardonnay',
    },
    {
      title: 'Pinot Noir',
      description: 'Light-bodied red with notes of cherry and raspberry',
      imageClass: 'card__image--pinot',
    },
    {
      title: 'Cabernet Sauvignon',
      description: 'Full-bodied red with dark fruit and oak flavors',
      imageClass: 'card__image--cabernet',
    },
    {
      title: 'Sauvignon Blanc',
      description: 'Crisp and refreshing white with citrus notes',
      imageClass: 'card__image--sauvignon',
    },
  ];

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
        withIndicators
        loop
        dragFree
      >
        {wines.map((wine, index) => (
          <Carousel.Slide key={index}>
            <Container
              className="card"
              style={{ maxWidth: 460, width: '100%' }}
            >
              <div className={`card__image ${wine.imageClass}`}></div>
              <Container className="card__content">
                <Title className="card__title">{wine.title}</Title>
                <Text className="card__description" c="dark.4">
                  {wine.description}
                </Text>
              </Container>
            </Container>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}
