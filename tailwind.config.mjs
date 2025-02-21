/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      const colors = theme("colors");
      const newVars = Object.fromEntries(
        Object.entries(colors).flatMap(([key, val]) =>
          typeof val === "object"
            ? Object.entries(val).map(([shade, hex]) => [`--${key}-${shade}`, hex])
            : [[`--${key}`, val]]
        )
      );

      addBase({ ":root": newVars });
    },
  ],
};
