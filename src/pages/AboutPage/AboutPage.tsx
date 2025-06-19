import {
  Anchor,
  Box,
  Container,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { motion } from 'framer-motion';
import logo from '@/assets/rsschool-logo.png';
import { TeamMemberCard } from '@/components/Card/TeamMemberCard';
import { team } from '@/shared/constants/team';
import '@/pages/AboutPage/AboutPage.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function AboutPage() {
  const theme = useMantineTheme();
  return (
    <Container className="page">
      <Box className="about-container">
        <Box style={{ marginBottom: '60px' }}>
          <Title
            order={1}
            size="32px"
            className="about-title"
            style={{ marginBottom: '24px' }}
          >
            About Our Winery
          </Title>
          <Text>
            At WineShop, we are dedicated to providing an exquisite online wine
            shopping experience. Our commitment is to quality wines, exceptional
            service, and innovative selection. Our team ensures we deliver the
            latest vintages, a seamless purchase process, and unparalleled
            support. We believe in integrity, innovation, and customer
            appreciation. Our values drive us to continuously improve our
            selections and enhance the wine-buying journey.
          </Text>
        </Box>
        <Box style={{ marginBottom: '36px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Title
              order={2}
              style={{ marginBottom: '24px' }}
              c={theme.colors.accent[4]}
            >
              Meet Our Team:
            </Title>
          </motion.div>
          <Text style={{ marginBottom: '32px' }}>
            We are the dedicated frontend engineers who architected and built
            this APP delivering a premium digital shopping experience.
          </Text>
          <Grid gutter="lg" style={{ marginBottom: '24px' }} align="stretch">
            {team.map((member, index) => (
              <Grid.Col span={{ base: 12, sm: 4 }} key={index}>
                <motion.div
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  style={{ height: '100%' }}
                >
                  <TeamMemberCard member={member} />
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
        <Title order={3} style={{ marginBottom: '24px' }}>
          Teamwork collaboration:
        </Title>
        <Grid gutter="lg" style={{ marginBottom: '36px' }}>
          <Grid.Col span={{ base: 12, sm: 3 }}>
            <Group className="team-collaboration-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                width="32px"
              >
                <rect
                  fill={theme.colors.primary[3]}
                  height="32"
                  rx="15%"
                  width="32"
                />
                <rect height="12" rx="2" width="8" x="18" y="6" />
                <rect height="18" rx="2" width="8" x="6" y="6" />
              </svg>
              <Text c={theme.colors.primary[3]}>
                Kanban board with sprint planning
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 3 }}>
            <Group className="team-collaboration-item">
              <svg
                width="32px"
                height="32px"
                viewBox="0 -28.5 256 256"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                  fill={theme.colors.primary[3]}
                  fillRule="nonzero"
                ></path>
              </svg>
              <Text c={theme.colors.primary[3]}>
                24/7 Discord communication
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 3 }}>
            <Group className="team-collaboration-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="32px"
                height="32px"
                fill="none"
                stroke={theme.colors.primary[3]}
                strokeWidth="6"
              >
                <path d="M50 15 A41 41 0 1 1 49.99 15" />
                <circle cx="50" cy="15" r="11" fill={theme.colors.primary[3]} />
                <circle cx="15" cy="75" r="11" fill={theme.colors.primary[3]} />
                <circle cx="85" cy="75" r="11" fill={theme.colors.primary[3]} />
              </svg>
              <Text c={theme.colors.primary[3]}>
                Support and help of teammates
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 3 }}>
            <Group className="team-collaboration-item">
              <svg
                width="32px"
                height="32px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill={theme.colors.primary[3]}
                style={{ display: 'block' }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                />
              </svg>
              <Text c={theme.colors.primary[3]}>
                Mutual code reviews on GitHub
              </Text>
            </Group>
          </Grid.Col>
        </Grid>
        <Container className="container__dark" style={{ border: 'none' }}>
          <Stack align="center">
            <Title
              order={2}
              style={{ marginBottom: '24px', marginTop: '24px' }}
            >
              Big thanks to:
            </Title>
            <Anchor
              href="https://rs.school/courses/javascript-ru"
              className="rsschool-logo-container"
              bg={theme.colors.accent[4]}
              style={{
                padding: '1.5rem',
                borderRadius: '0.75rem',
                marginBottom: '24px',
              }}
            >
              <Image className="rsschool-logo" src={logo}></Image>
            </Anchor>
            <Text
              className="rsschool-description"
              c={theme.colors.primary[3]}
              size="14px"
              style={{ marginBottom: '24px' }}
            >
              RS School offers a unique learning experience as a free,
              community-based online education initiative. It has been run by
              the Rolling Scopes community since 2013. Today, over 600
              developer-volunteers from various countries and companies assist
              as mentors. We believe in important ideas that guide our mission.
            </Text>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
}
