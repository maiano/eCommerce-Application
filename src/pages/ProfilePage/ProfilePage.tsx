import { Avatar, Badge, Box, Button, Container, Grid, Group, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import '@/pages/ProfilePage/ProfilePage.css';
import { getUserInfo } from "@/features/profile/profile";

const user = await getUserInfo();

export function ProfilePage() {
  const theme = useMantineTheme();

  return (
    <Container className="page">
      <Container className="profile-container">
        <Title order={1} className="profile-title" style={{marginBottom:'24px'}}>
          My Profile
        </Title>
        <Box className="profile-container">
          <Box className="container-dark" style={{marginBottom:'24px'}}>
            <Group className="profile-section" justify="space-between">
              <Group>
                <Avatar className="profile-avatar" name={`${user?.body.firstName?.[0]} ${user?.body.lastName}`} color={theme.primaryColor} variant="filled" size="80px" style={{border: 'none', '--avatar-color': theme.colors.primary[9]}}></Avatar>
                <Box className="profile-info">
                  <Title order={2} className="profile-name" size="xl">
                    {user?.body.firstName} {user?.body.lastName}
                  </Title>
                  <Text c={theme.colors.primary[3]} size="14px">{user?.body.email}</Text>
                </Box>
              </Group>
              <Group>
                <Button className="button button--secondary">Edit</Button>
                <Button className="button button--secondary">Change Password</Button>
              </Group>
            </Group>
          </Box>
          <Container className="container-dark info-section" style={{marginBottom:'24px'}}>
            <Group justify="space-between" style={{marginBottom:'16px'}}>
            <Title order={2} className="profile-name" size="xl" >
              Personal Information
            </Title>
            <Button className="button button--secondary">Edit</Button>
            </Group>
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">First Name</Text>
                  <Text>{user?.body.firstName}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">Last Name</Text>
                  <Text>{user?.body.lastName}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">Date of Birth</Text>
                  <Text>{user?.body.dateOfBirth}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
              </Grid.Col>
            </Grid>
          </Container>
          <Container className="container-dark address-section" style={{marginBottom:'24px'}}>
            <Title order={2} className="profile-name" size="xl" style={{marginBottom:'16px'}}>
              My addresses
            </Title>
            {user?.body.addresses.map((address, index) => (
              <Container className="address-item" style={{marginBottom:'16px'}} key={index}>
                <Group justify="space-between">
                  <Box>
                    <Badge style={{'--badge-color': theme.colors.primary[9], marginBottom: '12px'}} radius='sm'>
                      {address.id === user.body.defaultShippingAddressId ? 'Default shipping address':
                       address.id === user.body.defaultBillingAddressId ? 'Default billing address':
                       user.body.shippingAddressIds?.map((id) => address.id === id ? 'Shipping address': 'Billing address')
                      }
                      </Badge>
                    <Text className="address-text">{address.streetName}</Text>
                    <Text className="address-text">{address.postalCode}</Text>
                    <Text className="address-text">{address.city}</Text>
                    <Text className="address-text">{address.country}</Text>
                  </Box>
                  <Group>
                    <Button className="button button--secondary">Edit</Button>
                    <Button className="button button--secondary">Remove</Button>
                  </Group>
                </Group>
              </Container>
            ))}
            <Button className="button button--primary button--medium">Add new address</Button>
          </Container>
        </Box>
      </Container>
    </Container>
  )
}