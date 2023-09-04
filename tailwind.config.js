/** @type {import('tailwindcss').Config} */
export default {
  safelist: [
    {
      pattern: /bg-/,
      variants: ['hover']
    },
    {
      pattern: /text-/,
      variants: ['hover']
    },
  ],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 5s linear infinite",
      },
    },
  },
};
