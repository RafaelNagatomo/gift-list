import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        buttonColor: {
          primary: '#007bff',
          secondary: '#6c757d',
        },
        textColor: {
          primary: '#007bff',
          secondary: '#6c757d',
          disabled: '#adb5bd',
        },
      },
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }
  },
};

export default config;
