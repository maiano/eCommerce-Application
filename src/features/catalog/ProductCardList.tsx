import { Grid } from '@mantine/core';
import { CatalogProductCard } from '@/features/catalog/CatalogProductCard';
import { ProductCard } from '@/shared/schemas/product-card-schema';

export function ProductCardList({ products }: { products: ProductCard[] }) {
  return (
    <Grid
      gutter="md"
      justify="center"
      style={{ width: '100%', maxWidth: 1400, padding: '0 1rem' }}
    >
      {products.map((product) => (
        <Grid.Col
          key={product.id}
          span={{ base: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CatalogProductCard wine={product} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
