import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      
      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'], // Use the Roboto variable font
      },
    },
  },
  plugins: [],
} satisfies Config;
