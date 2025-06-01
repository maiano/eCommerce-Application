import { Grid } from '@mantine/core';
import { ProductCard as Card } from '@/components/Card/ProductCard';
import { useProductCards } from '@/features/catalog/useProductCards';

export function ProductCardList({
  categoryIds = [],
  sortBy,
}: {
  categoryIds?: string[];
  sortBy?: string;
}) {
  const { data: products = [], isLoading } = useProductCards({
    categoryIds,
    sortBy,
    page: 1,
  });
  return (
    <Grid justify="center" style={{ width: '100%' }}>
      {products?.map((product) => (
        <Grid.Col
          key={product.id}
          span={{ base: 12, sm: 6, md: 3, lg: 3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            minWidth: 350,
            maxWidth: 400,
          }}
        >
          <Card wine={product} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
