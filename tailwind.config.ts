import type { Config } from "tailwindcss";
import { withAccountKitUi, createColorSet } from "@account-kit/react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

// wrap your existing tailwind config with 'withAccountKitUi'
export default withAccountKitUi(
  config,
  {
    // override account kit themes
    colors: {
      "btn-primary": createColorSet("#f15b87", "#FF66CC"),
      "fg-accent-brand": createColorSet("#f15b87", "#FF66CC"),
    },
    borderRadius: "md",
  },
);
// export default config;
