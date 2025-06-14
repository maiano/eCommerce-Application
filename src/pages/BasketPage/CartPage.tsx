import {
  Container,
  Title,
  Text,
  Box,
  Group,
  Button,
  Grid,
  Image,
  Stack,
  NumberInput,
  ActionIcon,
  Card,
  Divider,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import '@/pages/BasketPage/CartPage.css';
import { useCartStore, removeFromCart, changeQuantity, clearCart } from '@/shared/hooks/useCartStore.ts';
import { CartMessage } from '@/components/CartMessage/CartMessage.tsx';

export function CartPage() {
  const cart = useCartStore(state => state.cart);

  const handleIncrease = (e: React.MouseEvent, lineItemId: string, currentQuantity: number) => {
    e.stopPropagation();
    changeQuantity(lineItemId, currentQuantity + 1)
      .then(() => console.log('Quantity increased'))
      .catch(() => console.log('Failed to increase'));
  };

  const handleDecrease = (e: React.MouseEvent, lineItemId: string, currentQuantity: number) => {
    e.stopPropagation();
    if (currentQuantity > 1) {
      changeQuantity(lineItemId, currentQuantity - 1)
        .then(() => console.log('Quantity decreased'))
        .catch(() => console.log('Failed to decrease'));
    }
  };

  const handleRemove = (e: React.MouseEvent, lineItemId: string) => {
    e.stopPropagation();
    removeFromCart(lineItemId)
      .then(() => console.log('Product removed'))
      .catch(() => console.log('Failed to remove'));
  };

  const handleClearCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearCart()
      .then(() => console.log('Cart cleared'))
      .catch(() => console.log('Failed to clear cart'));
  };

  const handleQuantityChange = (lineItemId: string, newQuantity: number) => {
    changeQuantity(lineItemId, newQuantity)
      .then(() => console.log('Quantity changed'))
      .catch(() => console.log('Failed to change'));
  };

  const subtotal = cart?.lineItems.reduce(
    (sum, item) => sum + (item.price.value.centAmount / 100) * item.quantity,
    0
  ) || 0;

  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  const getLocalizedValue = (value: unknown, locale = 'en-US'): string => {
    if (typeof value === 'string') {
      return value;
    }
    if (value && typeof value === 'object' && value !== null) {
      if (locale in value) {
        const localizedValue = (value as Record<string, unknown>)[locale];
        if (typeof localizedValue === 'string') {
          return localizedValue;
        }
      }
    }
    return 'No description available';
  };

  if (!cart || cart.lineItems.length === 0) {
    return <CartMessage />;
  }

  return (
    <Container fluid className="page">
      <Box className="cart-container">
        <Title order={1} className="section-title" mb="xl">
          Your Shopping Cart
        </Title>

        <Grid gutter="xl">
          <Grid.Col span={12}>
            <Stack>
              {cart.lineItems.map((item) => {
                const price = item.price.value.centAmount / 100;
                const imageUrl = item.variant.images?.[0]?.url ||
                  '../src/assets/fallback_1.png';

                const itemName = getLocalizedValue(item.name);

                return (
                  <Card key={item.id} className='cart-item'>
                    <Grid gutter="md">
                      <Grid.Col span={4}>
                        <Image
                          src={imageUrl}
                          height={120}
                          fit="contain"
                          alt={itemName}
                        />
                      </Grid.Col>

                      <Grid.Col span={8}>
                        <Stack>
                          <Title order={3} size="h4">
                            {itemName}
                          </Title>
                          <Text fw={700} size="lg">
                            ${price.toFixed(2)}
                          </Text>

                          <Group mt="sm">
                            <Group>
                              <ActionIcon
                                variant="outline"
                                size="md"
                                disabled={item.quantity <= 1}
                                onClick={(e) => handleDecrease(e, item.id, item.quantity)}
                              >
                                –
                              </ActionIcon>
                              <NumberInput
                                value={item.quantity}
                                min={1}
                                max={10}
                                step={1}
                                hideControls
                                onChange={(value) => {
                                  if (typeof value === 'number') {
                                    handleQuantityChange(item.id, value);
                                  }
                                }}
                                styles={{ input: { width: 50, textAlign: 'center' } }}
                              />
                              <ActionIcon
                                variant="outline"
                                size="md"
                                onClick={(e) => handleIncrease(e, item.id, item.quantity)}
                              >
                                +
                              </ActionIcon>
                            </Group>

                            <ActionIcon
                              variant="light"
                              onClick={(e) => handleRemove(e, item.id)}
                            >
                              🗑️
                            </ActionIcon>
                          </Group>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Card>
                );
              })}
            </Stack>
          </Grid.Col>

          <Grid.Col span={12}>
            <Card withBorder radius="md" p="xl" className="cart-summary">
              <Stack>
                <Title order={2} size="h3" mb="sm">
                  Order Summary
                </Title>

                <Group>
                  <Text>Products: </Text>
                  <Text fw={600}>{cart.lineItems.length}</Text>
                </Group>

                <Group>
                  <Text>Subtotal: </Text>
                  <Text fw={600}>${subtotal.toFixed(2)}</Text>
                </Group>

                <Group>
                  <Text>Shipping: </Text>
                  <Text fw={600}>${shipping.toFixed(2)}</Text>
                </Group>

                <Divider my="sm" />

                <Group className="total">
                  <Text size="lg" fw={700}>
                    Total:
                  </Text>
                  <Text size="lg" fw={700}>
                    ${total.toFixed(2)}
                  </Text>
                </Group>

                <Group justify="center">
                <Button
                  component={Link}
                  to={ROUTES.CATALOG}
                  className="button button--primary button--large" w="50%"
                >
                  Continue Shopping
                </Button>

                <Button
                  className="button button--secondary button--large"
                  w="50%"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
                </Group>

              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>
    </Container>
  );
}
