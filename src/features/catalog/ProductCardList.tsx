import { Grid } from '@mantine/core';
import { CatalogProductCard } from '@/features/catalog/CatalogProductCard';
import { ProductCard } from '@/shared/schemas/product-card-schema';

export function ProductCardList({ products }: { products: ProductCard[] }) {
  return (
    <Grid justify="center" style={{ width: '100%' }}>
      {products.map((product) => (
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
          <CatalogProductCard wine={product} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
