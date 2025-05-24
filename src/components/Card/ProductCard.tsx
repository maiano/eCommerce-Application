import { Card, Text, Group, Image, Box, Button } from '@mantine/core';
import { WineCardProps } from '@/types/types';
import { ROUTES } from '@/app/routes.tsx';
import { Link } from 'react-router-dom';

export function ProductCard({ wine }: WineCardProps) {
  return (
    <Card
      padding="lg"
      className={'product-card'}
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
            // fallbackSrc="./src/assets/fallback_1.png"
          />
        </Card.Section>

        <Group justify="space-between" align="center" mt="sm" wrap="nowrap">
          <Text fw={500} size="lg">
            {wine.title}
          </Text>
            <Button
              className="button button--primary"
              component={Link}
              to={ROUTES.CATALOG}
              style={{ cursor: 'pointer', width: 90, height: 35 }}
            >
              More info
            </Button>
        </Group>

        <Group justify="space-between" mt="sm" wrap="nowrap">
          <Text
            c="dimmed"
            size="sm"
            lineClamp={2}
            style={{ flex: 1, minWidth: 0 }}
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

      <Group justify="space-between" mt="md">
        <Text fw={700} size="xl">
          ${wine.price}
        </Text>
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
