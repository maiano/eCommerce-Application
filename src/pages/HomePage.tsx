import { Link } from 'react-router-dom';
import '../pages/HomePage.css';
import { Container, Title, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';

export function HomePage() {
  const mobile = useMediaQuery('(max-width: 768px)');

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
  ];

  const features = [
    {
      title: 'Exclusive Selection',
      description:
        'Explore a hand-picked collection of wines from top vineyards',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M205.33,95.67,183.56,21.74A8,8,0,0,0,175.89,16H80.11a8,8,0,0,0-7.67,5.74L50.67,95.67a63.46,63.46,0,0,0,17.42,64.67A87.39,87.39,0,0,0,120,183.63V224H88a8,8,0,1,0,0,16h80a8,8,0,1,0,0-16H136V183.63a87.41,87.41,0,0,0,51.91-23.29A63.46,63.46,0,0,0,205.33,95.67ZM86.09,32h83.82L190,100.19c.09.3.17.6.25.9-21.42,7.68-45.54-1.6-58.63-8.23C106.43,80.11,86.43,78.49,71.68,80.93ZM177,148.65a71.69,71.69,0,0,1-98,0,47.55,47.55,0,0,1-13-48.46l.45-1.52c12-4.06,31.07-5.14,57.93,8.47,11.15,5.65,29.16,12.85,48.43,12.85a68.64,68.64,0,0,0,19.05-2.6A47.2,47.2,0,0,1,177,148.65Z" />
        </svg>
      ),
    },
    {
      title: 'Tasting Events',
      description: 'Join our wine tasting events and discover new flavors',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z" />
        </svg>
      ),
    },
    {
      title: 'Fast Delivery',
      description: 'Enjoy quick and reliable delivery of your favorite wines',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,247.42,117ZM184,88h34.58l9.6,24H184ZM24,72H168v64H24ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm81-24H103A32,32,0,0,0-62,0H24V152H168v12.31A32.11,32.11,0,0,0,153,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm48-24H215a32.06,32.06,0,0,0-31-24V128h48Z" />
        </svg>
      ),
    },
  ];

  return (
    <Container fluid className="page" style={{ paddingInline: 0 }}>
      <Container
        className="page__container"
        style={{ marginInline: 0, paddingInline: 0 }}
      >

        <Container
          className="content"
          style={{ marginInline: 0, paddingInline: 0 }}
        >
          <Container
            className="content__container"
            style={{ marginInline: 0, paddingInline: 0 }}
          >
            <Container style={{ marginTop: 80}} className="hero__container">
              <Container className="hero__image">
                <Container className="hero__content">
                  <Title className="hero__title">
                    Explore the Finest Wines
                  </Title>
                  <Title fz='h2' className="hero__subtitle">
                    Discover a curated selection of exceptional wines from
                    renowned vineyards around the globe.
                  </Title>
                </Container>
                <Link
                  to="/catalog"
                  className="button button--primary button--large"
                >
                  <Text className="button__text" c="dark.5" fz={'h3'}>
                    Shop Now
                  </Text>
                </Link>
              </Container>
            </Container>

            <Container className="carousel">
              <Title className="section-title">Featured Selections</Title>
              <Carousel
                height={450}
                slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
                slideGap={{ base: 'xs', md: 'xs' }}
                controlSize={40}
                controlsOffset="xxs"
                align="start"
                slidesToScroll={mobile ? 2 : 4}
                withControls
                withIndicators
                loop
                dragFree
              >
                {wines.map((wine, index) => (
                  <Carousel.Slide key={index}>
                    <Container className="card" style={{ maxWidth: 360, width: '100%' }}>
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
            </Container>

            <Container className="discount-section">
              <Container className="discount-container">
                <Title className="discount-title" c="accent.4">
                  Summer Sale!
                </Title>
                <Container className="discount-description">
                  <Text>To get 25% off all products in your cart use code</Text>
                  <Text className="discount-code" c="accent.4" bg="dark.5">
                    SUMMER25
                  </Text>{' '}
                  at checkout.
                </Container>
              </Container>
            </Container>
            <Container className="features">
              <Container className="features__header">
                <Title className="features__title">Why Choose us?</Title>
                <Text className="features__subtitle">
                  Experience the art of wine with us. We offer a wide variety of
                  wines, tasting events, and convenient delivery options to
                  enhance your appreciation.
                </Text>
                <Link
                  to="/registration"
                  className="button button--primary button--large"
                >
                  <Text className="button__text" c="dark.5" fz={'h3'}>
                    Join
                  </Text>
                </Link>
              </Container>

              <Container className="features__grid">
                {features.map((feature, index) => (
                  <Container className="feature-card" key={index}>
                    <Container className="feature-card__icon">
                      {feature.icon}
                    </Container>
                    <Container className="feature-card__content">
                      <Title className="feature-card__title">
                        {feature.title}
                      </Title>
                      <Text className="feature-card__description">
                        {feature.description}
                      </Text>
                    </Container>
                  </Container>
                ))}
              </Container>
            </Container>
          </Container>
        </Container>

      </Container>
    </Container>
  );
}
