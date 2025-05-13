import { Link } from 'react-router-dom';
import '../pages/HomePage.css';
import { Container, Title, Text, Box, Group, Badge } from '@mantine/core';
import { Slider } from '@/components/Slider/Slider';
import { ProductCard } from '@/components/Card/Card'


export function HomePage() {

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
    <Container fluid className="page">
            <Box style={{ marginTop: 80}} className="hero">
                  <Title className="hero__title">
                    Explore the Finest Wines
                  </Title>
                  <Text fz={'h2'} className="hero__subtitle">
                    Discover a curated selection of exceptional wines from
                    renowned vineyards around the globe.
                  </Text>
                <Link
                  to="/catalog"
                  className="button button--primary button--large"
                >
                  <Text className="button__text" c="dark.6" fz={'h3'} fw={500}>
                    Shop Now
                  </Text>
                </Link>
            </Box>

            <Slider />

            <Box className="discount">
                <Title  fz={'h2'} className="discount-title" c="accent.4">
                  Summer Sale!
                </Title>
                <Group className="discount-description">
                  <Text fz={'h3'} fw={500}>To get 25% off all products in your cart use code
                    <Badge className="discount-code" c="accent.4" bg="dark.5" size="xl" radius="md">
                      SUMMER25
                    </Badge>
                    at checkout.</Text>
                </Group>
            </Box>

            <Box className="features">
              <Group className="features__header">
                <Title className="features__title" fz={'h2'}>Why Choose us?</Title>
                <Text className="features__subtitle" fz={'h3'} fw={500}>
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
              </Group>

              <Group className="features__grid">
              {features.map((feature, index) => (
                <ProductCard key={index} feature={feature} />
              ))}
              </Group>
            </Box>
          </Container>
  );
}
