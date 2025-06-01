import { Card, Text, Group, Image, Box, Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes.tsx';
import { ProductCard as WineCard } from '@/shared/schemas/product-card-schema';

type ProductCardProps = {
  wine: WineCard;
};

export function ProductCard({ wine }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      padding="lg"
      className={'product-card'}
      onClick={() => navigate(ROUTES.CATALOG)}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        maxWidth: 400,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box flex={1}>
        <Card.Section>
          <Image
            className={`product-card__image product-card__image--${wine.id}`}
            style={{ height: 300 }}
            fit={'scale-down'}
            fallbackSrc="./src/assets/fallback_1.png"
            src={wine.image}
            alt={wine.name}
          />
        </Card.Section>

        <Group
          justify="space-between"
          align="center"
          wrap="nowrap"
          style={{ alignItems: 'center' }}
        >
          <Text
            fw={500}
            size="lg"
            style={{
              height: 60,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {wine.name}
          </Text>
          <Button
            className="button button--secondary"
            component={Link}
            to={ROUTES.CATALOG}
            style={{
              cursor: 'pointer',
              width: 90,
              height: 35,
              alignSelf: 'center',
            }}
          >
            More info
          </Button>
        </Group>

        <Group justify="space-between" wrap="nowrap">
          <Text
            c="dimmed"
            size="sm"
            lineClamp={2}
            style={{ flex: 1, height: 60 }}
          >
            {wine.description}
          </Text>
          <Group gap={4} ml="xs">
            <Text fw={500} c="yellow.7">
              ★ {wine.rating}
            </Text>
            <Text c="dimmed" size="sm">
              /5
            </Text>
          </Group>
        </Group>
      </Box>

      <Group justify="space-between">
        {typeof wine.discountedPrice === 'number' ? (
          <Group gap="xs">
            <Text fw={700} size="xl" c="yellow.4">
              ${wine.discountedPrice}
            </Text>
            <Text
              fw={700}
              size="sm"
              c="dimmed"
              style={{ textDecoration: 'line-through' }}
            >
              ${wine.price}
            </Text>
          </Group>
        ) : (
          <Text fw={700} size="xl">
            ${wine.price}
          </Text>
        )}

        <Button
          className="button button--primary"
          radius="md"
          size="sm"
          style={{ flexShrink: 0 }}
        >
          Add to Cart
        </Button>
      </Group>
    </Card>
  );
}
