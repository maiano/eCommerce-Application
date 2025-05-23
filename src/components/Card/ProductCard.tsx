import { Card, Title, Text, Group } from '@mantine/core';
import { CardProps } from '@/types/types';

export function ProductCard({ wine }: CardProps) {
  return (
    <Card
      className="card"
      style={{ maxWidth: 460, width: '100%' }}
    >
      <div className={`card__image ${wine?.imageClass}`}></div>
      <Group className="card__content">
        <Title className="card__title">{wine?.title}</Title>
        <Text className="card__description" c="dark.4">
          {wine?.description}
        </Text>
      </Group>
    </Card>
  );
}
