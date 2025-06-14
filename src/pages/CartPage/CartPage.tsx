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
  Divider, useMantineTheme,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import '@/pages/CartPage/CartPage.css';
import { useCartStore, removeFromCart, changeQuantity, clearCart } from '@/shared/hooks/useCartStore.ts';
import { CartMessage } from '@/components/CartMessage/CartMessage.tsx';
import { useEffect, useState } from 'react';
import { ShippingMethod } from '@commercetools/platform-sdk';
import { apiClientManager } from '@/shared/lib/commercetools/api-client-manager';

export default function CartPage() {
  const cart = useCartStore(state => state.cart);
  const theme = useMantineTheme()

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);

  useEffect(() => {
    const fetchShippingMethod = async () => {
      try {
        const client = apiClientManager.get();
        if (!client) throw new Error('Client not initialized');

        const response = await client
          .shippingMethods()
          .get()
          .execute();

        const firstMethod = response.body.results[0];
        if (firstMethod) {
          setShippingMethod(firstMethod);
        }
      } catch (error) {
        console.error('Failed to fetch shipping methods:', error);
      }
    };

    fetchShippingMethod();
  }, []);


  const shippingMethodName = shippingMethod?.localizedName;
  const shippingDescription = shippingMethod?.localizedDescription;

  if (!shippingMethodName) return null;
  if (!shippingDescription) return null;

  const shipName: string = shippingMethodName['en-US'] || '';
  const shipDescription: string = shippingDescription['en-US'] || '';


  const subtotal = cart?.lineItems.reduce(
    (sum, item) => sum + (item.price.value.centAmount / 100) * item.quantity,
    0
  ) || 0;

  const shippingCents = shippingMethod?.zoneRates?.[0]?.shippingRates?.[0]?.price?.centAmount ?? 0;
  const shippingPrice = shippingCents / 100;
  const shipping = subtotal > 0 ? shippingPrice : 0;
  const total = subtotal + shipping;

  console.log(shippingCents);


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
                const imageUrl =
                  item.variant.images?.[0]?.url ||
                  '../src/assets/fallback_1.png';

                const itemName = getLocalizedValue(item.name);

                return (
                  <Card key={item.id} className="cart-item">
                    <Grid gutter="md" align="center">
                      <Grid.Col
                        span={4}
                        bg='primary.0'
                        className='card-image'
                        >
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

                          <Group mt="sm" justify="center">
                            <Group>
                              <ActionIcon
                                color={theme.colors.dark[5]}
                                size='lg'
                                disabled={item.quantity <= 1}
                                onClick={(e) =>
                                  handleDecrease(e, item.id, item.quantity)
                                }
                              >
                                –
                              </ActionIcon>
                              <NumberInput
                                variant="unstyled"
                                value={item.quantity}
                                min={1}
                                max={10}
                                step={1}
                                hideControls
                                color={theme.colors.dark[5]}
                                onChange={(value) => {
                                  if (typeof value === 'number') {
                                    handleQuantityChange(item.id, value);
                                  }
                                }}
                                styles={{
                                  input: { width: 50, textAlign: 'center',  border: '1px solid #32415d'  },
                                }}
                              />
                              <ActionIcon
                                color={theme.colors.dark[5]}
                                size='lg'
                                onClick={(e) =>
                                  handleIncrease(e, item.id, item.quantity)
                                }
                              >
                                +
                              </ActionIcon>
                            </Group>

                            <ActionIcon
                              onClick={(e) => handleRemove(e, item.id)}
                              color={theme.colors.dark[5]}
                              size='lg'
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                              </svg>
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
                  <Text fw={600}> ${shippingPrice.toFixed(2)} ({shipName})</Text>
                </Group>


                <Box mt="xs">
                  <Text size="sm" c="dimmed">
                    {shipDescription}
                  </Text>
                </Box>

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
                    className="button button--primary button--large"
                    w="50%"
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
