import { Card, Text, Group, Image, Box, Button } from '@mantine/core';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes.tsx';
import { ProductCard as WineCard } from '@/shared/schemas/product-card-schema';
import {
  addToCart,
  useCartStore,
  removeFromCart,
} from '@/shared/hooks/useCartStore.ts';
import {
  notifySuccess,
  notifyError,
} from '@/shared/utils/custom-notifications';

type ProductCardProps = {
  wine: WineCard;
};

export function CatalogProductCard({ wine }: ProductCardProps) {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const cartItem = cart?.lineItems.find(
    (item) => item.productId === wine.id && item.variant?.id === 1,
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(wine.id)
      .then(() => notifySuccess({ message: 'Added to cart', autoClose: 2000 }))
      .catch((error) =>
        notifyError(error, { message: 'Failed adding to cart' }),
      );
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      removeFromCart(cartItem.id)
        .then(() =>
          notifySuccess({ message: 'Product removed', autoClose: 2000 }),
        )
        .catch((error) => notifyError(error, { message: 'Failed to remove' }));
    }
  };

  return (
    <Card
      padding="sm"
      className={'product-card'}
      onClick={() => navigate(generatePath(ROUTES.PRODUCT, { id: wine.id }))}
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
            style={{ height: 300, objectFit: 'contain' }}
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
            className="wine-title"
            fw={500}
            size="lg"
            style={{
              height: 80,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {wine.name}
          </Text>
          <Button
            className="button button--secondary"
            component={Link}
            to={generatePath(ROUTES.PRODUCT, { id: wine.id })}
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
          <Text c="dimmed" size="sm" lineClamp={2} style={{ flex: 1 }}>
            {wine.country}
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

        {cartItem ? (
          <Button
            className="button button--remove"
            radius="md"
            size="sm"
            w="50%"
            style={{ flexShrink: 0 }}
            onClick={handleRemove}
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            className="button button--primary"
            radius="md"
            size="sm"
            style={{ flexShrink: 0 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        )}
      </Group>
    </Card>
  );
}
