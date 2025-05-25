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
  TextInput,
  Grid,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import type {Wine} from '@/types/types.tsx';
import { wines } from '@/types/types.tsx';
import { ProductCard } from '@/components/Card/ProductCard.tsx';


const sortOptions = [
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Rating: Low to High', value: 'rating_asc' },
  { label: 'Year: Newest First', value: 'year_desc' },
  { label: 'Year: Oldest First', value: 'year_asc' },
];

export function CatalogPage() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [sortBy, setSortBy] = useState<string>('price_asc');
  const [allWines, setProducts] = useState<Wine[]>(wines);

  useEffect(() => {
    const sorted = [...wines].sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating_desc':
          return b.rating - a.rating;
        case 'rating_asc':
          return a.rating - b.rating;
        case 'year_desc':
          return parseInt(b.year) - parseInt(a.year);
        case 'year_asc':
          return parseInt(a.year) - parseInt(b.year);
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

      <Group className="filters" mb="xl" style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid
          className="filter-group"
          gutter="md"
          grow
          justify="center"
          style={{ width: 'fit-content' }}
        >
          <Grid.Col span={{ base: 'auto', sm: 'auto', md: 'auto' }}>
            <Button fullWidth className="filter-button" variant="default">Red</Button>
          </Grid.Col>
          <Grid.Col span={{ base: 'auto', sm: 'auto', md: 'auto' }}>
            <Button fullWidth className="filter-button" variant="default">White</Button>
          </Grid.Col>
          <Grid.Col span={{ base: 'auto', sm: 'auto', md: 'auto' }}>
            <Button fullWidth className="filter-button" variant="default">Sparkling</Button>
          </Grid.Col>
          <Grid.Col span={{ base: 'auto', sm: 'auto', md: 'auto' }}>
            <Button fullWidth className="filter-button" variant="default">Rose</Button>
          </Grid.Col>
          <Grid.Col span={{ base: 'auto', sm: 'auto', md: 'auto' }}>
            <Button fullWidth className="filter-button" variant="default">Dessert</Button>
          </Grid.Col>
        </Grid>

        <Stack className="filter-group" style={{ minWidth: 212 }} >
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
      </Group>

      <Grid justify="center" style={{ width: '100%' }} >
        {allWines.map((wine: Wine) => (
          <Grid.Col
            key={wine.id}
            span={{
              base: 12,
              sm: 6,
              md: 3,
              lg: 3,
            }}
            style={{ display: 'flex', justifyContent: 'center', minWidth: 350, maxWidth: 400 }}
          >
            <ProductCard wine={wine} />
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
