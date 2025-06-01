import {
  useMantineTheme,
  Button,
  Burger,
  Box,
  Group,
  Title,
  Text,
  Menu, Anchor,
} from '@mantine/core';
import {
  useDisclosure,
  useClickOutside,
  useMediaQuery,
  useDidUpdate,
} from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import { useAuthStore } from '@/features/auth/auth-state';
import { apiClientManager } from '@/shared/lib/commercetools/api-client-manager';

export function Header() {
  const status = useAuthStore((state) => state.status);
  const isAuthenticated = status === 'AUTHENTICATED';

  const handleLogout = () => {
    apiClientManager.logout();
    useAuthStore.getState().logout();
    close();
  };

  const theme = useMantineTheme();
  const [opened, { toggle, close }] = useDisclosure();
  const isLargeScreen = useMediaQuery('(min-width: 768px)');

  useDidUpdate(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (opened) {
      document.body.classList.add('no-scroll');
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.classList.remove('no-scroll');
      document.body.style.paddingRight = '';
    }
  }, [opened]);

  useDidUpdate(() => {
    if (isLargeScreen) close();
  }, [isLargeScreen]);

  useClickOutside(
    () => opened && close(),
    ['mousedown', 'touchstart'],
    [
      document.querySelector('.header__nav'),
      document.querySelector('.burger-button'),
    ].filter((el): el is HTMLElement => el !== null),
  );

  return (
    <Box className="header" style={{ width: '100%', maxWidth: 1920 }}>
      <Group className="header__logo" style={{ justifyContent: 'start' }}>
        <Anchor
          component={Link}
          to={ROUTES.HOME}
          style={{
            color: theme.colors.red[9],
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <svg
            className="header__logo-icon"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
              fill="currentColor"
            />
          </svg>
          <Title className="header__logo-text">Wine not</Title>
        </Anchor>
      </Group>

      <Group className={`header__nav ${opened ? 'open' : ''}`}>
        <Burger
          className={`burger ${opened ? 'active' : ''}`}
          opened={opened}
          color={theme.colors.dark[1]}
          size="md"
          aria-label="Toggle navigation"
          onClick={toggle}
        />
        <Anchor className="header__nav-item" component={Link} to={ROUTES.HOME}>
          <Text>Main</Text>
        </Anchor>
        <Anchor className="header__nav-item" component={Link} to={ROUTES.CATALOG}>
          <Text>Catalog</Text>
        </Anchor>
        <Anchor className="header__nav-item" component={Link} to="/about">
          <Text>About us</Text>
        </Anchor>
        <Anchor className="header__nav-item header__nav-item--cart" component={Link} to="/cart">
          <Text>Cart</Text>
        </Anchor>

        {opened ? (
          isAuthenticated ? (
            <Button
              variant="filled"
              color={theme.colors.dark[4]}
              className="button burger-button--secondary"
              onClick={handleLogout}
            >
              <Text>Logout</Text>
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="filled"
                color="dark.5"
                className="button burger-button--secondary"
              >
                <Text>Login</Text>
              </Button>
              <Button
                component={Link}
                to="/registration"
                variant="filled"
                color={theme.colors.yellow[4]}
                className="button burger-button--primary"
              >
                <Text c="primary.9">Register</Text>
              </Button>
            </>
          )
        ) : null}

        {!opened && (
          <>
            <Button
              component={Link}
              to="/cart"
              color={theme.colors.dark[5]}
              className="button button--icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z" />
              </svg>
            </Button>

            <Menu position="bottom-end" width={200} withinPortal>
              <Menu.Target>
                <Button
                  color={theme.colors.dark[5]}
                  className="button button--icon"
                >
                  <svg
                    className="header__user-icon"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z"
                      stroke="#f8f9fb"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25.7377 27.5C25.7377 22.6625 20.9252 18.75 15.0002 18.75C9.07519 18.75 4.2627 22.6625 4.2627 27.5"
                      stroke="#f8f9fb"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {isAuthenticated ? (
                  <Menu.Item onClick={handleLogout}>
                    <Text>Logout</Text>
                  </Menu.Item>
                ) : (
                  <>
                    <Menu.Item component={Link} to={ROUTES.LOGIN}>
                      <Text>Login</Text>
                    </Menu.Item>
                    <Menu.Item component={Link} to={ROUTES.REGISTRATION}>
                      <Text>Register</Text>
                    </Menu.Item>
                  </>
                )}
              </Menu.Dropdown>
            </Menu>
          </>
        )}
      </Group>
    </Box>
  );
}
