/// <reference types="@account-kit/react" />
import { createColorSet, withAccountKitUi } from "@account-kit/react/tailwind";

export default withAccountKitUi(
  {
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
  },
  {
    // override account kit themes
    colors: {
      "btn-primary": createColorSet("#E82594", "#FF66CC"),
      "fg-accent-brand": createColorSet("#E82594", "#FF66CC"),
    },
  },
);
