import { Anchor, Box, Container, Grid, Image, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { TeamMemberCard } from "@/components/Card/TeamMemberCard";
import { team } from "@/shared/constants/team";
import '@/pages/AboutPage/AboutPage.css';

export function AboutPage() {
  const theme = useMantineTheme();
  return(
    <Container className="page">
      <Box className="about-container">
        <Box style={{marginBottom: '60px'}}>
          <Title order={1} size='32px' className="about-title" style={{marginBottom:'24px'}} c={theme.colors.accent[4]}>About Our Winery</Title>
          <Text>At WineShop, we are dedicated to providing an exquisite online wine shopping experience. Our commitment is to quality wines, exceptional service, and innovative selection. Our team ensures we deliver the latest vintages, a seamless purchase process, and unparalleled support. We believe in integrity, innovation, and customer appreciation. Our values drive us to continuously improve our selections and enhance the wine-buying journey.</Text>
        </Box>
        <Box>
          <Title order={2} style={{marginBottom: '24px'}}>Meet our team:</Title>
          <Text style={{marginBottom: '32px'}}>We are the dedicated frontend engineers who architected and built this APP delivering a premium digital shopping experience.</Text>
          <Grid gutter="lg" style={{marginBottom: '24px'}} align="stretch">
            {team.map((member, index) => (
            <Grid.Col span={{ base: 12, sm: 4 }} key={index}>
              <TeamMemberCard member={member}/>
            </Grid.Col>
            ))}
          </Grid>
        </Box>
        <Container className="container-dark" style={{border: 'none'}}>
          <Stack align="center">
            <Title order={2} style={{marginBottom: '24px'}}>Big thanks to:</Title>
            <Anchor href="https://rs.school/courses/javascript-ru" className="rsschool-logo-container" bg={theme.colors.accent[4]} style={{ padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '24px'}}>
              <Image className="rsschool-logo" src='../../src/assets/rsschool-logo.png'></Image>
            </Anchor>
            <Text className="rsschool-description" c={theme.colors.primary[3]} size="14px">RS School offers a unique learning experience as a free, community-based online education initiative. It has been run by the Rolling Scopes community since 2013. Today, over 600 developer-volunteers from various countries and companies assist as mentors. We believe in important ideas that guide our mission.</Text>
          </Stack>
        </Container>
      </Box>
    </Container>
  )
}