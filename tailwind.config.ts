import daisyui from "daisyui";
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#189ab4",

          secondary: "#B45D00",

          accent: "#00ffff",

          neutral: "#ff00ff",

          "base-100": "#0D1B2A",

          info: "#0000ff",

          success: "#00ff00",

          warning: "#00ff00",

          error: "#ff0000",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"], // Use the Roboto variable font
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
