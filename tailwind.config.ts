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
        primary: '#007bff', // Customize your primary color
        secondary: '#6c757d', // Customize your secondary color
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        buttonColor: {
          primary: '#007bff', // Customize your button primary color
          secondary: '#6c757d', // Customize your button secondary color
        },
        textColor: {
          primary: '#007bff', // Customize your text primary color
          secondary: '#6c757d', // Customize your text secondary color
          disabled: '#adb5bd', // Customize your disabled color
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#007bff', // Customize your primary color
          'secondary': '#6c757d', // Customize your secondary color
          'accent': '#34D399', // Optional: accent color for additional styling
          'neutral': '#3d4451', // Optional: neutral color for backgrounds
          'base-100': '#ffffff', // Base background color
          'info': '#3abff8',
          'success': '#36d759',
          'warning': '#fbbd23',
          'error': '#f87171',
        },
      },
    ],
  },
};

export default config;
