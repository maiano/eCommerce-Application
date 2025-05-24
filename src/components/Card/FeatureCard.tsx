import { Card, Title, Text} from '@mantine/core';
import { FeatureCardProps } from '@/types/types';


export function FeatureCard({ feature }: FeatureCardProps) {
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
