import { Avatar, Button, Card, List, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { TeamMemberCardProps } from "@/types/types";

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const theme = useMantineTheme();

  return (
    <Card padding="lg" className="container-dark">
      <Stack align="center">
        <Avatar size='100px' src={member.avatar}/> 
        <Title order={3} className="member-card__name" style={{marginTop: '16px'}}>
          {member.name}
        </Title>
        <Text className="member-card__role" c={theme.colors.accent[4]} size="14px" style={{marginBottom: '16px'}}>
          {member.role}
        </Text>
        <Text className="member-card__bio" c={theme.colors.primary[3]} size="14px" style={{marginBottom: '24px'}}>
          {member.description}
        </Text>
        <List type="ordered" className="member-card__description" c={theme.colors.primary[3]} style={{marginBottom: '16px'}}>
          {member.contributions.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        </List>
        <Button component={Link} to={member.github} className="button button--primary">GitHub</Button>
      </Stack>
    </Card>
  )
}