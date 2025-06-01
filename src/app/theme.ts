import { createTheme, MantineColorsTuple, rem, Container } from '@mantine/core';

const primaryColors: MantineColorsTuple = [
  '#f8f9fb', // 0 primary text
  '#e6e9f2',
  '#d4d8e9',
  '#8a9dc0', // 3 secondary text
  '#6d7fa2',
  '#516185',
  '#3a4d6d',
  '#29374c', // 7 Back
  '#1d2a36', // 8
  '#141c24', // 9
];

const accentColors: MantineColorsTuple = [
  '#fef9e6',
  '#fdf0c4',
  '#fbe79f',
  '#fade77',
  '#f4c753', // 4 gold
  '#e6b945',
  '#d8ab37',
  '#ca9d29',
  '#bc8f1b',
  '#ae810d',
];

const darkColors: MantineColorsTuple = [
  '#f0f4f8',
  '#d9e2ec',
  '#bcccdc',
  '#9fb3c8',
  '#829ab1',
  '#32415d', // 5 border
  '#1d2a36', // 6 cards
  '#131c24', // 7 background
  '#0a1018',
  '#00070f',
];

const redColors: MantineColorsTuple = [
  '#ffebee',
  '#ffcdd2',
  '#ef9a9a',
  '#e57373',
  '#ef5350',
  '#f44336',
  '#e53935',
  '#d32f2f',
  '#c62828',
  '#8b0000', // 9 logo
];

export const theme = createTheme({
  primaryColor: 'accent',
  primaryShade: 4,
  colors: {
    primary: primaryColors,
    accent: accentColors,
    dark: darkColors,
    red: redColors,
  },
  fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
  headings: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    sizes: {
      h1: { fontSize: rem(28), lineHeight: '1.25' },
      h2: { fontSize: rem(24), lineHeight: '1.25' },
      h3: { fontSize: rem(20), lineHeight: '1.25' },
      h4: { fontSize: rem(18), lineHeight: '1.25' },
    },
  },
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },
  radius: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(20),
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  components: {
    AppShell: {
      styles: {
        root: {
          backgroundColor: darkColors[7],
        },
        main: {
          // paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    Header: {
      styles: {
        root: {
          backgroundColor: darkColors[7],
          borderBottom: `${rem(1)} solid ${darkColors[5]}`,
          padding: `${rem(12)} ${rem(24)}`,
        },
      },
    },
    Footer: {
      styles: {
        root: {
          backgroundColor: darkColors[7],
          borderTop: `${rem(1)} solid ${darkColors[5]}`,
          padding: `${rem(20)} ${rem(0)}`,
        },
      },
    },
    Title: {
      styles: {
        root: {
          color: primaryColors[1],
        },
      },
    },
    Text: {
      styles: {
        root: {
          color: primaryColors[1],
        },
      },
    },
    Container: Container.extend({
      styles: () => ({
        root: {
          maxWidth: rem(1920),
        },
      }),
    }),
    Button: {
      styles: {
        root: {
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    Carousel: {
      styles: {
        root: {
          transition: 'all 0.3s ease-in-out',
        },
        viewport: {
          overflowY: 'visible',
        },
        slide: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        container: {
          alignItems: 'stretch',
        },
      },
    },
    Loader: {
      defaultProps: {
        type: 'dots',
        color: accentColors[4],
      },
    },
    Fieldset: {
      styles: {
        root: {
            backgroundColor: darkColors[6],
            padding: '0 0.5rem',
        },
      },
    },
    TextInput: {
      styles: {
        root: {
          borderColor: darkColors[6],
        },
      },
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: darkColors[6],
        },
      },
    },
  Anchor: {
    styles: {
      root: {
        color: darkColors[2],
        transition: 'all 0.3s ease-in-out',
      },
    },
   },
  CloseButton: {
    styles: {
      root: {
        color: darkColors[6],
        transition: 'all 0.3s ease-in-out',
      },
    },
    }
  },
});
