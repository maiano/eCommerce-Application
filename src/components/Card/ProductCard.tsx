import { Card, Text, Group, Image, Box, Button } from '@mantine/core';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes.tsx';
import { useImageHandler } from '@/shared/hooks/useImageHandler.ts';
import { WineCardProps } from '@/types/types';

export function ProductCard({ wine }: WineCardProps) {
  const navigate = useNavigate();
  const { handleImageLoad, imgRef, checkImage } = useImageHandler();

  useEffect((): void => {
    if (imgRef.current) {
      checkImage(imgRef.current);
    }
  }, [wine.image, checkImage]);

  return (
    <Card
      padding="lg"
      className={'product-card'}
      onClick={() =>
        navigate(ROUTES.PRODUCT.replace(':id', wine.id.toString()))
      }
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
            onLoad={handleImageLoad}
          />
        </Card.Section>

        <Group
          justify="space-between"
          align="center"
          wrap="nowrap"
          style={{ alignItems: 'center' }}
        >
          <Text
            className='wine-title'
            fw={500}
            size="lg"
            style={{
              height: 80,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {wine.title}
          </Text>
          <Button
            className="button button--secondary"
            component={Link}
            to={ROUTES.PRODUCT.replace(':id', wine.id.toString())}
            style={{
              cursor: 'pointer',
              minWidth: 80,
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
        {wine.discountedPrice ? (
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
