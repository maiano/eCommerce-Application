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
import { useState } from 'react';

type ProductCardProps = {
  wine: WineCard;
};

export function CatalogProductCard({ wine }: ProductCardProps) {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const cartItem = cart?.lineItems.find(
    (item) => item.productId === wine.id && item.variant?.id === 1,
  );

  const cartCurrency = cart?.totalPrice.currencyCode || 'EUR';

  const formatCurrency = (price: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(price);
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      await addToCart(wine.id);
      notifySuccess({ message: 'Added to cart', autoClose: 2000 });
    } catch (error) {
      notifyError(error, { message: 'Failed adding to cart' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cartItem || isProcessing) return;

    setIsProcessing(true);
    try {
      await removeFromCart(cartItem.id);
      notifySuccess({ message: 'Product removed', autoClose: 2000 });
    } catch (error) {
      notifyError(error, { message: 'Failed to remove' });
    } finally {
      setIsProcessing(false);
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
        <Card.Section bg="primary.0">
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

      <Group justify="space-between" wrap="nowrap">
        {typeof wine.discountedPrice === 'number' ? (
          <Group gap="xs" h="60px">
            <Text fw={700} size="xl" c="yellow.4">
              {formatCurrency(wine.discountedPrice, cartCurrency)}
            </Text>
            <Text
              fw={700}
              size="sm"
              c="dimmed"
              style={{ textDecoration: 'line-through' }}
            >
              {formatCurrency(wine.price, cartCurrency)}
            </Text>
          </Group>
        ) : (
          <Text fw={700} size="xl" h="60px" style={{ paddingTop: 14 }}>
            {formatCurrency(wine.price, cartCurrency)}
          </Text>
        )}

        {cartItem ? (
          <Button
            className="button button--remove"
            w="45%"
            style={{ flexShrink: 0, minWidth: '135px' }}
            onClick={handleRemove}
            disabled={isProcessing}
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
            disabled={isProcessing}
          >
            Add to Cart
          </Button>
        )}
      </Group>
    </Card>
  );
}
