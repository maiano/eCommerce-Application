import { BaseAddress, ClientResponse, Customer } from "@commercetools/platform-sdk";
import { Avatar, Badge, Box, Button, Container, Grid, Group, Stack, Text, Title, Modal, useMantineTheme, useModalsStack } from "@mantine/core";
import '@/pages/ProfilePage/ProfilePage.css';
import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/auth-state";
import { deleteAddress } from "@/features/profile/address";
import { AddressForm } from "@/features/profile/AddressForm";
import { ChangePasswordForm } from "@/features/profile/ChangePasswordForm";
import { PersonalInfoForm } from "@/features/profile/PersonalInfoForm";
import { countries } from "@/shared/constants/countries";
import { getUserInfo } from "@/shared/utils/get-user-info";

export function ProfilePage() {
  const theme = useMantineTheme();
  
  const stack = useModalsStack(['change-password', 'update-info', 'add-address', 'edit-address', 'delete-address']);

  const status = useAuthStore((state) => state.status);
  const isAuthenticated = status === 'AUTHENTICATED';

  const [user, setUser] = useState<ClientResponse<Customer> | null>(null);

  const [selectedAddress, setSelectedAddress] = useState<BaseAddress | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (isAuthenticated) {
        const user = await getUserInfo();
        if (user) {
          setUser(user);
        }
      }
    };
    getUser();
  }, [isAuthenticated]);

  return (
    <Container className="page">
      <Box className="profile-container">
        <Title order={1} className="profile-title" style={{marginBottom:'24px'}}>
          My Profile
        </Title>
        <Box className="profile-section-container">
          <Box className="container-dark" style={{marginBottom:'24px'}}>
            <Group className="profile-section" justify="space-between">
              <Group>
                <Avatar className="profile-avatar" name={`${user?.body.firstName?.[0]} ${user?.body.lastName}`} color={theme.primaryColor} variant="filled" size="80px" style={{border: 'none', '--avatar-color': theme.colors.primary[9]}}></Avatar>
                <Box className="profile-info">
                  <Title order={2} className="profile-name" size="xl">
                    {user?.body.firstName} {user?.body.lastName}
                  </Title>
                </Box>
              </Group>
              <Group>
                <Button
                  className="button button--secondary"
                  onClick={() => stack.open('change-password')}
                  >Change Password
                </Button>
              </Group>
            </Group>
          </Box>
          <Container className="container-dark info-section" style={{marginBottom:'24px'}}>
            <Group justify="space-between" style={{marginBottom:'16px'}}>
            <Title order={2} className="profile-name" size="xl" >
              Personal Information
            </Title>
            <Button 
              className="button button--secondary"
              onClick={() => {
                stack.open('update-info');
              }}
              >Edit
            </Button>
            </Group>
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">First Name</Text>
                  <Text>{user?.body.firstName}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">Last Name</Text>
                  <Text>{user?.body.lastName}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">Email</Text>
                  <Text>{user?.body.email}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack style={{ gap: 5 }}>
                  <Text c={theme.colors.primary[3]} size="14px">Date of Birth</Text>
                  <Text>{user?.body.dateOfBirth}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Container>
          <Container className="container-dark address-section" style={{marginBottom:'24px'}}>
            <Title order={2} className="profile-name" size="xl" style={{marginBottom:'16px'}}>
              My addresses
            </Title>
            {user?.body.addresses.map((address, index) => (
              <Container className="address-item" style={{marginBottom:'16px'}} key={index}>
                <Stack gap={0}>
                  <Group style={{marginBottom: '8px'}}>
                    {user.body.shippingAddressIds?.includes(address.id ?? '') && (
                      <Badge style={{'--badge-color': theme.colors.primary[9]}} radius='sm'>
                        {address.id === user.body.defaultShippingAddressId ? 'Default shipping address' :
                         user.body.shippingAddressIds?.includes(address.id ?? '') ? 'Shipping address' : ''
                        }
                      </Badge>
                    )}
                    {user.body.billingAddressIds?.includes(address.id ?? '') && (
                      <Badge style={{'--badge-color': theme.colors.primary[9]}} radius='sm'>
                        {address.id === user.body.defaultBillingAddressId ? 'Default billing address' :
                         user.body.billingAddressIds?.includes(address.id ?? '') ? 'Billing address' : ''
                        }
                      </Badge>
                    )}
                  </Group>
                  <Group justify="space-between">
                    <Box>
                      <Text className="address-text">{address.streetName}</Text>
                      <Text className="address-text">{address.postalCode}</Text>
                      <Text className="address-text">{address.city}</Text>
                      <Text className="address-text">{countries[address.country as keyof typeof countries]}</Text>
                    </Box>
                    <Group>
                      <Button 
                        className="button button--secondary"
                        onClick={() => {
                          setSelectedAddress(address);
                          stack.open('edit-address');
                        }}
                        >
                          Edit
                      </Button>
                      <Button
                        className="button button--secondary"
                        onClick={() => {
                          setSelectedAddress(address);
                          stack.open('delete-address');
                        }}
                        >
                          Remove
                      </Button>
                    </Group>
                  </Group>
                </Stack>
              </Container>
            ))}

            <Button
              className="button button--primary button--medium"
              onClick={() => {
                stack.open('add-address');
              }}
              >Add new address
            </Button>
            
            {/* Change password */}
            <Modal {...stack.register('change-password')} centered>
              <ChangePasswordForm onClose={async() => {
                stack.close('change-password');
                const updatedUser = await getUserInfo();
                if (updatedUser) {
                  setUser(updatedUser);
                }
                }}/>
            </Modal>

            {/* Update user info */}
            <Modal {...stack.register('update-info')} centered>
              <PersonalInfoForm onClose={async() => {
                stack.close('update-info');
                const updatedUser = await getUserInfo();
                if (updatedUser) {
                  setUser(updatedUser);
                }
                }}/>
            </Modal>

            {/* Add address */}
            <Modal {...stack.register('add-address')} centered>
              <AddressForm
                onClose={async() => stack.close('add-address')}
                type={'add'}
                address={null}
                onUpdate={async() => {
                  const updatedUser = await getUserInfo();
                  if (updatedUser) {
                    setUser(updatedUser);
                  }
                }}/>
            </Modal>

            {/* Edit address */}
            <Modal {...stack.register('edit-address')} centered>
              <AddressForm
                onClose={async() => stack.close('edit-address')}
                type={'edit'}
                address={selectedAddress}
                onUpdate={async() => {
                  const updatedUser = await getUserInfo();
                  if (updatedUser) {
                    setUser(updatedUser);
                  }
                }}/>
            </Modal>

            {/* Delete address */}
            <Modal
              {...stack.register('delete-address')}
              closeButtonProps={{color: theme.colors.dark[4]}}
              centered 
              onClose={async() => {
                stack.close('delete-address');
                const updatedUser = await getUserInfo();
                if (updatedUser) {
                  setUser(updatedUser);
                }}
              }>
              <Title size='20px' style={{marginBottom: '32px', textAlign: 'center'}}>Are you sure you want to remove this address?</Title>
              <Text size="md" ta="center">{selectedAddress?.streetName}, {selectedAddress?.city}, {countries[selectedAddress?.country as keyof typeof countries]}, {selectedAddress?.postalCode}</Text>
              <Button
                style={{marginTop: '16px'}}
                className="button button--primary"
                fullWidth
                onClick={async() => {
                  await deleteAddress(selectedAddress?.id);
                  const updatedUser = await getUserInfo();
                  if (updatedUser) {
                    setUser(updatedUser);
                  }
                  stack.close('delete-address');
                  }
                }
                >Remove
              </Button>
              <Button
                style={{marginTop: '16px'}}
                className="button button--secondary"
                fullWidth
                onClick={() => stack.close('delete-address')}
                >Cancel
              </Button>
            </Modal>
          </Container>
        </Box>
      </Box>
    </Container>
  )
}