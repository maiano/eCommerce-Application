import '@/index.css';
import './CatalogPage.css';
import {
  Container,
  Box,
  Button,
  Stack,
  Combobox,
  useCombobox,
  InputBase,
  Group,
  Text,
  TextInput,
  Grid,
  Card,
  Image,
} from '@mantine/core';
import { useState, useEffect } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  description: string;
};

const sortOptions = [
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Rating: Low to High', value: 'rating_asc' },
];

const initialProducts: Product[] = [
  { id: 1, title: 'Estate Pinot Noir', price: 140, rating: 4.8, description: 'Elegant red wine with cherry and earthy tones' },
  { id: 2, title: 'Sparkling Delight', price: 80, rating: 4.5, description: 'Festive sparkling wine with fine persistent bubbles' },
  { id: 3, title: 'Coastal Breeze Sauvignon', price: 200, rating: 4.7, description: 'Refreshing white wine with tropical fruit accents' },
  { id: 4, title: 'Hillside Blend', price: 100, rating: 5, description: 'Complex blend with blackcurrant and spice flavors' },
  { id: 5, title: 'Sunset Rosé', price: 150, rating: 3.9, description: 'Fruity rosé with strawberry undertones' },
  { id: 6, title: 'Valley White', price: 60, rating: 4.2, description: 'Crisp white wine with citrus notes' },
  { id: 7, title: 'Vineyard Reserve', price: 299, rating: 4.4, description: 'Aged oak barrel red wine' },
  { id: 8, title: 'Chateau Rouge', price: 120, rating: 5, description: 'Rich red wine with dark berry aromas' },
];

export function CatalogPage() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [sortBy, setSortBy] = useState<string>('price_asc');
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const sorted = [...initialProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating_desc':
          return b.rating - a.rating;
        case 'rating_asc':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
    setProducts(sorted);
  }, [sortBy]);

  return (
    <Container fluid className="page">
      <Box style={{ marginTop: 20 }} className="search-input">
        <TextInput
          placeholder="Enter product name"
          size="md"
          radius="md"
          className="search-input__field"
          leftSection={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          }
          rightSectionPointerEvents="none"
        />
      </Box>

      <Box className="filters" mb="xl">
        <Stack className="filter-group">
          <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
              setSortBy(val);
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <InputBase
                component="button"
                type="button"
                pointer
                rightSection={<Combobox.Chevron />}
                rightSectionPointerEvents="none"
                onClick={() => combobox.toggleDropdown()}
                classNames={{ input: 'form-input' }}
                aria-label="Sort products by"
              >
                {sortOptions.find((opt) => opt.value === sortBy)?.label}
              </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>
                {sortOptions.map((option) => (
                  <Combobox.Option
                    value={option.value}
                    key={option.value}
                    className="sort-option"
                  >
                    {option.label}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        </Stack>
        <Group>
          <Button variant="default">Red wines</Button>
          <Button variant="default">White wines</Button>
          <Button variant="default">Sparkling wines</Button>
          <Button variant="default">Rose wines</Button>
          <Button variant="default">Dessert wines</Button>
        </Group>
      </Box>

      <Grid gutter="xl" justify="center" style={{ width: '100%' }}>
        {products.map((product) => (
          <Grid.Col
            key={product.id}
            span={{
              base: 12,
              xs: 6,
              sm: 4,
              md: 3,
              lg: 2.4,
            }}
            style={{ display: 'flex', justifyContent: 'center', minWidth: 400 }}
          >
            <Card
              padding="lg"
              style={{
                width: '100%',
                maxWidth: 300,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box flex={1}>
                <Image
                  className={`product-card__image product-card__image--${product.id}`}
                  style={{ height: 200 }}
                />
                <Text fw={500} size="lg" mt="md">
                  {product.title}
                </Text>

                <Group justify="space-between" mt="sm" wrap="nowrap">
                  <Text
                    c="dimmed"
                    size="sm"
                    lineClamp={2}
                    style={{ flex: 1, minWidth: 0 }}
                  >
                    {product.description}
                  </Text>
                  <Group gap={4} ml="xs">
                    <Text fw={500} c="yellow.7">
                      ★ {product.rating}
                    </Text>
                    <Text c="dimmed" size="sm">
                      /5
                    </Text>
                  </Group>
                </Group>
              </Box>

              <Group justify="space-between" mt="md">
                <Text fw={700} size="xl">
                  ${product.price}
                </Text>
                <Button
                  className="button button--primary"
                  radius="md"
                  size="sm"
                  variant="light"
                  color="blue"
                  style={{ flexShrink: 0 }}
                >
                  Add to Cart
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Group justify="center" mt="xl" mb="xl">
        <Button variant="default">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left-pipe"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 6v12" />
            <path d="M18 6l-6 6l6 6" />
          </svg>
        </Button>
        <Button variant="default">1</Button>
        <Button variant="default">2</Button>
        <Button variant="default">3</Button>
        <Button variant="default">4</Button>
        <Button variant="default">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right-pipe"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 6l6 6l-6 6" />
            <path d="M17 5v13" />
          </svg>
        </Button>
      </Group>
    </Container>
  );
}
