import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { wines } from '@/types/types';
import {
  Box,
  Text,
  Group,
  Image,
  Button,
  Table,
  Title,
  Container,
  Badge,
  Divider,
  Modal,
  CloseButton,
} from '@mantine/core';
import { ROUTES } from '@/app/routes';
import { Carousel } from '@mantine/carousel';
import './ProductPage.css';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const wine = wines.find(w => w.id === parseInt(id || ''));

  const [modalOpened, setModalOpened] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!wine) {
    return (
      <Container>
        <Text size="xl" mb="md">Product not found</Text>
        <Button onClick={() => navigate(ROUTES.CATALOG)}>
          Back to Catalog
        </Button>
      </Container>
    );
  }

  const ratingAttribute = wine.attributes.find(attr => attr.name === "Rating");
  const ratingValue = ratingAttribute ? parseFloat(ratingAttribute.value) : wine.rating;

  return (
    <Container className="page" style={{ marginTop: 20 }}>
      <Box className='product-content'>
        <Box style={{ maxWidth: 500, width: '100%' }}>
          <Carousel
            withIndicators
            loop
            onSlideChange={(index) => setCurrentImageIndex(index)}
            style={{ width: '100%' }}
          >
            {wine.image.map((img, index) => (
              <Carousel.Slide key={index}>
                <Image
                  src={img}
                  alt={`${wine.title} ${index + 1}`}
                  fit="contain"
                  height={500}
                  radius="md"
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setModalOpened(true);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </Carousel.Slide>
            ))}
          </Carousel>

          <Group justify="center" mt="md">
            {wine.image.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  opacity: index === currentImageIndex ? 1 : 0.6,
                  border: index === currentImageIndex ? '2px solid #F59F00' : 'none',
                  transition: 'opacity 0.3s ease'
                }}
              >
                <Image
                  src={wine.image[index]}
                  alt={`Thumbnail ${index + 1}`}
                  height={60}
                  width={60}
                  fit="cover"
                />
              </div>
            ))}
          </Group>
        </Box>

        <Box style={{ flex: 1, maxWidth: 600 }}>
          <Title order={1} mb="sm" c="yellow.7">
            {wine.title}
          </Title>

          <Divider my="xl" />

          <Title order={3} mb="md">Description:</Title>
          <Text mb="md" size="lg" c="dimmed" style={{ lineHeight: 1.6 }}>
            {wine.description}
          </Text>

          <Divider my="xl" />

          <Title order={3} mb="md">Price:</Title>
          <Group mb="xl" align="center">
            {wine.discountedPrice ? (
              <>
                <Text fw={700} size="xl" c="yellow.7">
                  ${wine.discountedPrice}
                </Text>
                <Text fw={700} size="md" c="dimmed" td="line-through">
                  ${wine.price}
                </Text>
                <Badge color="red" size="lg">
                  Save ${wine.price - wine.discountedPrice}
                </Badge>
              </>
            ) : (
              <Text fw={700} size="xl">
                ${wine.price}
              </Text>
            )}
          </Group>

          <Divider my="xl" />

          <Title order={3} mb="md">Wine Details:</Title>
          <Table mb="xl" verticalSpacing="sm" withTableBorder withColumnBorders>
            <Table.Tbody>
              {wine.attributes
                .filter(attr => attr.name !== "Rating")
                .map((attr, index) => (
                  <Table.Tr key={index}>
                    <Table.Th fw={700} style={{ width: '30%' }}>{attr.name}:</Table.Th>
                    <Table.Td fw={700}>{attr.value}</Table.Td>
                  </Table.Tr>
                ))}

              <Table.Tr>
                <Table.Th fw={700}>Rating:</Table.Th>
                <Table.Td>
                  <Group gap={4} ml="xs">
                    <Text fw={500} c="yellow.7">
                      ★ {ratingValue}
                    </Text>
                    <Text c="dimmed" size="md">
                      /5
                    </Text>
                  </Group>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>

          <Group mt="xl" grow justify="center">
            <Button
              className="button button--primary button--large"
              maw='200'
            >
              Add to Cart
            </Button>
            <Button
              className="button button--secondary button--large"
              onClick={() => navigate(ROUTES.CATALOG)}
              maw='200'
            >
              Continue Shopping
            </Button>
          </Group>
        </Box>
      </Box>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        fullScreen
        padding={0}
        withCloseButton={false}
        transitionProps={{ duration: 200 }}
        style={{ overflow: 'hidden' }}
      >
        <CloseButton
          onClick={() => setModalOpened(false)}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white'
          }}
          size="xl"
        />

        <Carousel
          initialSlide={currentImageIndex}
          withIndicators
          loop
          style={{
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onSlideChange={(index: number) => setCurrentImageIndex(index)}
        >
          {wine.image.map((img, index: number) => (
            <Carousel.Slide key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
              <Image
                src={img}
                alt={`${wine.title} ${index + 1}`}
                fit="contain"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Modal>
    </Container>
  );
}
