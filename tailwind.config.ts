import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chillired: {
          DEFAULT: '#C21825',
          dark: '#8F0F1A',
          light: '#FDF0F1',
        },
        royalred: {
          DEFAULT: '#C21825',
          dark: '#8F0F1A',
          light: '#FDF0F1',
        },
        metallicgold: {
          DEFAULT: '#D4AF37',
          light: '#E8C95A',
          dark: '#A88620',
        },
        deepteal: {
          DEFAULT: '#8F0F1A',
          light: '#FDF0F1',
          dark: '#5E0810',
        },
        ivory: '#FFFFF0',
        charcoal: '#252525',
        // Semantic aliases preserving existing component classes without Blue/Purple/Neon
        midnight: {
          DEFAULT: '#252525',
          light: '#8F0F1A',
        },
        deepdark: '#5E0810',
        lightbg: '#FFFFF0',
        royalblue: '#C21825',
        electricpurple: '#8F0F1A',
        electric: {
          DEFAULT: '#C21825',
          light: '#D4AF37',
        },
        neonpurple: {
          DEFAULT: '#8F0F1A',
          light: '#D4AF37',
        },
        cyan: {
          DEFAULT: '#D4AF37',
          light: '#E8C95A',
        },
        turquoise: {
          DEFAULT: '#8F0F1A',
          light: '#C21825',
        },
        skyblue: '#D4AF37',
        hotpink: {
          DEFAULT: '#C21825',
          light: '#E03544',
        },
        coralpink: '#C21825',
        goldyellow: {
          DEFAULT: '#D4AF37',
          light: '#E8C95A',
        },
        purewhite: {
          DEFAULT: '#FFFFFF',
          muted: '#F7EFE0',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
