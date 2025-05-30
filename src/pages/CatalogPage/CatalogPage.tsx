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
  ComboboxStore,
} from '@mantine/core';
import { CloseButton } from '@mantine/core';
import { useState } from 'react';
import { ProductCard } from '@/components/Card/ProductCard.tsx';
import { useCategories } from '@/features/catalog/useCategories';
import { useWineSorting } from '@/features/sorting/useWineSorting.tsx';
import type { Wine } from '@/types/types.tsx';
import { wines } from '@/types/types.tsx';

export function CatalogPage() {
  // const { data: categories, isLoading: categoriesLoading } = useCategories();

  const combobox: ComboboxStore = useCombobox({
    onDropdownClose: (): void => combobox.resetSelectedOption(),
  });

  const { sortedWines, sortBy, setSortBy, sortOptions } = useWineSorting(wines);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = ['Red', 'White', 'Sparkling', 'Rose', 'Dessert'];

  const toggleCategory: (category: string) => void = (
    category: string,
  ): void => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const resetCategories: () => void = (): void => {
    setSelectedCategories([]);
  };

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

      <Group
        className="filters"
        mb="xl"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid
          className="filter-group"
          gutter="md"
          grow
          justify="center"
          style={{ width: 'fit-content' }}
        >
          {categories.map((category: string) => (
            <Grid.Col
              key={category}
              span={{ base: 'auto', sm: 'auto', md: 'auto' }}
            >
              <Button
                fullWidth
                className={`filter-button ${selectedCategories.includes(category) ? 'button--primary' : ''}`}
                variant={
                  selectedCategories.includes(category) ? 'filled' : 'default'
                }
                onClick={() => toggleCategory(category)}
                styles={{
                  ...(selectedCategories.includes(category) && {
                    root: {
                      padding: '4px 4px 4px 10px',
                    },
                  }),
                }}
                rightSection={
                  selectedCategories.includes(category) ? (
                    <CloseButton
                      className={'button--primary'}
                      size="sm"
                      variant="subtle"
                      icon={
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M1 1L13 13M13 1L1 13" strokeWidth="2" />
                        </svg>
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(category);
                      }}
                    />
                  ) : null
                }
              >
                {category}
              </Button>
            </Grid.Col>
          ))}
          <Grid.Col span={{ base: 'auto', sm: 'auto', md: 'auto' }}>
            <Button
              fullWidth
              className="filter-button"
              variant="default"
              onClick={resetCategories}
            >
              Reset All
            </Button>
          </Grid.Col>
        </Grid>

        <Stack className="filter-group" style={{ minWidth: 212 }}>
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

      <Grid justify="center" style={{ width: '100%' }}>
        {sortedWines.map((wine: Wine) => (
          <Grid.Col
            key={wine.id}
            span={{
              base: 12,
              sm: 6,
              md: 3,
              lg: 3,
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: 350,
              maxWidth: 400,
            }}
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
