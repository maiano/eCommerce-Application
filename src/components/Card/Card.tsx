import { Card, Title, Text } from '@mantine/core';
import { ProductCardProps } from '@/types/types';


export function ProductCard({ feature }: ProductCardProps) {
  return (
    <Card padding="lg" className="feature-card">
        {feature.icon}
      <Card.Section className="feature-card__content">
        <Title className="feature-card__title">
          {feature.title}
        </Title>
        <Text className="feature-card__description">
          {feature.description}
        </Text>
      </Card.Section>
    </Card>
  )
}
