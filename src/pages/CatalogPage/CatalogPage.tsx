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
  Pagination,
} from '@mantine/core';
import { useMemo, useState } from 'react';
import { ProductCardList } from '@/features/catalog/ProductCardList';
import { useCategories } from '@/features/catalog/useCategories';
import { useProductCards } from '@/features/catalog/useProductCards';
import {
  productSortOptions,
  ProductSortOption,
} from '@/shared/constants/sorting';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { CategoryButton } from '@/shared/ui/CategoryButton';

export function CatalogPage() {
  const { data: categories = [] } = useCategories();
  const [selectedCategorySlugs, setSelectedCategorySlugs] = useState<string[]>(
    [],
  );

  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchInput.toLowerCase());

  const combobox: ComboboxStore = useCombobox({
    onDropdownClose: (): void => combobox.resetSelectedOption(),
  });

  const [sortBy, setSortBy] = useState<ProductSortOption>('price_asc');

  const slugToIdMap = useMemo(() => {
    return categories.reduce(
      (acc, category) => {
        const slug = category.slug['en-US'];
        if (slug) acc[slug] = category.id;
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [categories]);

  const selectedCategoryIds = selectedCategorySlugs
    .map((slug) => slugToIdMap[slug])
    .filter(Boolean);

  const toggleCategory = (slug: string) => {
    setSelectedCategorySlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
    setPage(1);
  };

  const resetCategories = () => {
    setSelectedCategorySlugs([]);
    setPage(1);
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country],
    );
    setPage(1);
  };

  const resetCountries = () => {
    setSelectedCountries([]);
    setPage(1);
  };

  const { data, isLoading } = useProductCards({
    categoryIds: selectedCategoryIds,
    countries: selectedCountries,
    sortBy,
    page,
    searchTerm: debouncedSearchTerm.length >= 3 ? debouncedSearchTerm : '',
  });

  const total = data?.total ?? 0;
  const products = data?.items ?? [];

  return (
    <Container fluid className="page">
      <Box style={{ marginTop: 20 }} className="search-input">
        <TextInput
          placeholder="Search by word (min 3 letters, e.g. 'Spain')"
          size="md"
          radius="md"
          className="search-input__field"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.currentTarget.value);
            setPage(1);
          }}
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
          {categories?.map((category) => {
            const slug = category.slug['en-US'];
            const label = category.name['en-US'].split(' ')[0];

            if (!slug || !label) return null;
            const selected = selectedCategorySlugs.includes(slug);

            return (
              <Grid.Col
                key={slug}
                span={{ base: 'auto', sm: 'auto', md: 'auto' }}
              >
                <CategoryButton
                  label={label}
                  selected={selected}
                  onToggle={() => toggleCategory(slug)}
                />
              </Grid.Col>
            );
          })}

          {['France', 'Spain', 'Italy'].map((country) => {
            const selected = selectedCountries.includes(country);
            return (
              <Grid.Col
                key={country}
                span={{ base: 'auto', sm: 'auto', md: 'auto' }}
              >
                <CategoryButton
                  label={country}
                  selected={selected}
                  onToggle={() => toggleCountry(country)}
                />
              </Grid.Col>
            );
          })}

          <Grid.Col span={{ base: 'auto', sm: 'auto', md: 'auto' }}>
            <Button
              fullWidth
              className="filter-button"
              variant="default"
              onClick={() => {
                resetCategories();
                resetCountries();
              }}
            >
              Reset All
            </Button>
          </Grid.Col>
        </Grid>

        <Stack className="filter-group" style={{ minWidth: 212 }}>
          <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
              setSortBy(val as ProductSortOption);
              combobox.closeDropdown();
              setPage(1);
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
                {productSortOptions.find((opt) => opt.value === sortBy)?.label}
              </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>
                {productSortOptions.map((option) => (
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

      <ProductCardList products={products} />

      <Group justify="center" mt="xl" mb="xl">
        <Pagination
          total={Math.ceil(total / 8)}
          value={page}
          onChange={setPage}
          size="md"
          radius="md"
          withControls
          withEdges
        />
      </Group>
    </Container>
  );
}
