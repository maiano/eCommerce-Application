import { useParams, useNavigate } from 'react-router-dom';
import { wines } from '@/types/types.tsx';
import { Box, Text, Group, Image, Button, Table, Title, Container, Badge, Divider } from '@mantine/core';
import { ROUTES } from '@/app/routes';
import { Carousel } from '@mantine/carousel';
import './ProductPage.css'

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const wine = wines.find(w => w.id === parseInt(id || ''));

  if (!wine) return null;

  const ratingAttribute = wine.attributes.find(attr => attr.name === "Rating");
  const ratingValue = ratingAttribute ? parseFloat(ratingAttribute.value) : wine.rating;

  return (
    <Container className="page" style={{ marginTop: 20}}>
      <Box className='product-content'>
        <Group style={{ display: 'flex', justifyContent: 'center'}}>
          <Carousel
            loop
            withIndicators
            height={500}
            style={{ maxWidth: 500, width: '100%' }}
          >
            {wine.image.map((img, index) => (
              <Carousel.Slide key={index}>
                <Image
                  src={img}
                  alt={`${wine.title} ${index + 1}`}
                  fit="contain"
                  height={500}
                  radius="md"
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Group>

        <Box w="55%">
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
          <Table mb="xl" verticalSpacing="sm" variant="vertical" layout="fixed" withTableBorder withColumnBorders>
            <Table.Tbody ta='center'>
              {wine.attributes
                .filter(attr => attr.name !== "Rating")
                .map((attr, index) => (
                  <Table.Tr key={index}>
                    <Table.Th fw={700} className='product-attribute' style={{ width: '30%' }}>
                      {attr.name}:
                    </Table.Th>
                    <Table.Td fw={700}>{attr.value}</Table.Td>
                  </Table.Tr>
                ))}
              <Table.Tr>
                <Table.Th className='product-attribute' fw={700}>
                  Rating:
                </Table.Th>
                <Table.Td>
                  <Group gap={4} ml="xs" style={{ justifyContent: 'center' }}>
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

          <Group mt="xl" grow>
            <Button
              className="button button--primary button--large"
            >
              Add to Cart
            </Button>
            <Button
              className="button button--secondary button--large"
              onClick={() => navigate(ROUTES.CATALOG)}
            >
              Continue Shopping
            </Button>
          </Group>
        </Box>
      </Box>
    </Container>
  );
}
