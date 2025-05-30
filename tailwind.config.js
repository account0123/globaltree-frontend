/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/bg.svg')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
