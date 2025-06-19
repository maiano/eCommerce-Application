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
  useMantineTheme,
  TextInput,
  Badge,
  Modal,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import '@/pages/CartPage/CartPage.css';
import {
  useCartStore,
  removeFromCart,
  changeQuantity,
  clearCart,
  addDiscount,
  removeDiscount,
  fetchShippingMethod,
} from '@/shared/hooks/useCartStore.ts';
import { CartMessage } from '@/components/CartMessage/CartMessage.tsx';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const cartError = useCartStore((state) => state.error);
  const shipMethod = useCartStore((state) => state.shippingMethod);

  const theme = useMantineTheme();
  const cartCurrency = cart?.totalPrice.currencyCode || 'EUR';

  const [opened, { open, close }] = useDisclosure(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountError, setDiscountError] = useState('');

  useEffect(() => {
    if (!shipMethod) {
      fetchShippingMethod().catch(() => {
        console.log('Error fetching shipmethod');
      });
    }
  }, [shipMethod]);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;

    addDiscount(promoCode.trim())
      .then(() => {
        console.log('Promo code applied');
        setPromoCode('');
        setDiscountError('');
      })
      .catch(() => {
        console.log('Failed to apply promo code');
        setDiscountError(cartError || 'Invalid promo code');
      });
  };

  const handleRemovePromo = (discountCodeId: string) => {
    removeDiscount(discountCodeId)
      .then(() => {
        console.log('Discount removed');
      })
      .catch(() => {
        console.log('Failed to remove discount');
        setDiscountError('Failed to remove discount');
      });
  };

  const handleClearCart = () => {
    const removalPromises = appliedDiscounts.map((dc) =>
      removeDiscount(dc.discountCode.id),
    );

    Promise.all(removalPromises)
      .then(() => clearCart())
      .then(() => {
        console.log('Cart cleared');
        close();
      })
      .catch((error) => console.error('Failed to clear cart', error));
  };

  const handleClearCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    open();
  };

  const shippingMethodName = shipMethod?.localizedName;
  const shippingDescription = shipMethod?.localizedDescription;

  if (!shippingMethodName) return null;
  if (!shippingDescription) return null;

  const shipName: string = shippingMethodName['en-US'] || '';
  const shipDescription: string = shippingDescription['en-US'] || '';

  const subtotal =
    cart?.lineItems.reduce(
      (sum, item) => sum + (item.price.value.centAmount / 100) * item.quantity,
      0,
    ) || 0;

  const shippingCents =
    shipMethod?.zoneRates?.[0]?.shippingRates?.[0]?.price?.centAmount ?? 0;
  const shippingPrice = shippingCents / 100;

  const totalForItems = cart?.totalPrice.centAmount / 100 || subtotal;

  const itemsDiscount = Math.max(0, subtotal - totalForItems);

  const totalWithShipping = totalForItems + (subtotal > 0 ? shippingPrice : 0);

  const totalWithoutDiscount = subtotal + (subtotal > 0 ? shippingPrice : 0);

  const appliedDiscounts =
    cart?.discountCodes.filter((dc) => dc.state === 'MatchesCart') || [];

  const handleIncrease = (
    e: React.MouseEvent,
    lineItemId: string,
    currentQuantity: number,
  ) => {
    e.stopPropagation();
    changeQuantity(lineItemId, currentQuantity + 1)
      .then(() => console.log('Quantity increased'))
      .catch(() => console.log('Failed to increase'));
  };

  const handleDecrease = (
    e: React.MouseEvent,
    lineItemId: string,
    currentQuantity: number,
  ) => {
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

  const formatCurrency = (amount: number, currencyCode: string) => {
    const normalizedAmount = amount / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(normalizedAmount);
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
          <Grid.Col span={12} className="cart-column">
            <Stack>
              {cart.lineItems.map((item) => {
                const formattedPrice = formatCurrency(
                  item.totalPrice.centAmount,
                  item.totalPrice.currencyCode,
                );
                const imageUrl =
                  item.variant.images?.[0]?.url ||
                  '../src/assets/fallback_1.png';

                const itemName = getLocalizedValue(item.name);

                return (
                  <Card key={item.id} className="cart-item">
                    <Grid
                      gutter="md"
                      align="center"
                      classNames={{
                        inner: 'cart-inner',
                      }}
                    >
                      <Grid.Col span={4} bg="primary.0" className="card-image">
                        <Image
                          src={imageUrl}
                          height={120}
                          fit="contain"
                          alt={itemName}
                        />
                      </Grid.Col>

                      <Grid.Col span={8} maw="100%">
                        <Stack>
                          <Title order={3} size="h4">
                            {itemName}
                          </Title>
                          <Text fw={700} size="lg" c="dimmed">
                            {formattedPrice}
                          </Text>

                          <Group mt="sm" justify="center">
                            <Group>
                              <ActionIcon
                                color={theme.colors.dark[5]}
                                size="lg"
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
                                styles={{
                                  input: {
                                    width: 50,
                                    textAlign: 'center',
                                    border: '1px solid #32415d',
                                  },
                                }}
                              />
                              <ActionIcon
                                color={theme.colors.dark[5]}
                                size="lg"
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
                              size="lg"
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

          <Grid.Col span={12} className="cart-column">
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
                  <Text fw={600}>
                    {formatCurrency(subtotal * 100, cartCurrency)}
                  </Text>
                </Group>

                {itemsDiscount > 0 && (
                  <Group mt="xs">
                    <Text>Discount:</Text>
                    <Text fw={600} c="green">
                      - {formatCurrency(itemsDiscount * 100, cartCurrency)}
                    </Text>
                  </Group>
                )}

                <Group>
                  <Text>Shipping: </Text>
                  <Text fw={600}>
                    {' '}
                    {formatCurrency(shippingPrice * 100, cartCurrency)} (
                    {shipName})
                  </Text>
                </Group>

                <Box mt="xs">
                  <Text size="sm" c="dimmed">
                    {shipDescription}
                  </Text>
                </Box>

                {appliedDiscounts.length > 0 ? (
                  <Group mt="sm" align="center" justify="center">
                    {appliedDiscounts.map((dc) => (
                      <Group key={dc.discountCode.id}>
                        <Badge
                          color="green"
                          variant="dot"
                          size="xl"
                          radius="md"
                        >
                          Promo code applied
                        </Badge>
                        <Button
                          className="button button--remove"
                          onClick={() => handleRemovePromo(dc.discountCode.id)}
                        >
                          Remove
                        </Button>
                      </Group>
                    ))}
                  </Group>
                ) : (
                  <Group mt="sm" align="flex-end">
                    <TextInput
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(event) =>
                        setPromoCode(event.currentTarget.value)
                      }
                      error={discountError}
                      style={{ flex: 1 }}
                    />
                    <Button
                      className="button button--primary"
                      onClick={handleApplyPromo}
                      disabled={!promoCode.trim()}
                    >
                      Apply
                    </Button>
                  </Group>
                )}

                <Divider my="sm" />

                <Group className="total" align="baseline">
                  <Text size="lg" fw={700}>
                    Total:
                  </Text>

                  {itemsDiscount > 0 ? (
                    <Group>
                      <Text size="lg" fw={700} c="yellow">
                        {formatCurrency(totalWithShipping * 100, cartCurrency)}
                      </Text>
                      <Text size="lg" fw={700} td="line-through" c="dimmed">
                        {formatCurrency(
                          totalWithoutDiscount * 100,
                          cartCurrency,
                        )}
                      </Text>
                    </Group>
                  ) : (
                    <Text size="lg" fw={700}>
                      {formatCurrency(totalWithoutDiscount * 100, cartCurrency)}
                    </Text>
                  )}
                </Group>

                <Group justify="center">
                  <Button
                    className="button button--secondary button--large button--cart"
                    w="50%"
                    onClick={handleClearCartClick}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    component={Link}
                    to={ROUTES.CATALOG}
                    className="button button--primary button--large button--cart"
                    w="50%"
                  >
                    Continue Shopping
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>

      <Modal
        className="modal"
        opened={opened}
        onClose={close}
        title="Clear Shopping Cart"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Text size="md" mb="xl">
          Are you sure you want to clear your cart?
        </Text>

        <Group justify="flex-end">
          <Button
            variant="outline"
            onClick={close}
            className="button button--secondary"
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleClearCart}
            className="button button--remove"
          >
            Clear Cart
          </Button>
        </Group>
      </Modal>
    </Container>
  );
}
