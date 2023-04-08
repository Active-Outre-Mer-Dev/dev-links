/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "Fira Mono"]
      }
    },
    colors: {
      neutral: {
        50: "#f0eefa",
        100: "#d2d0e2",
        200: "#b4b0cc",
        300: "#9591b8",
        400: "#7772a3",
        500: "#5f598a",
        600: "#49446b",
        700: "#34314d",
        800: "#1f1d2f",
        900: "#090914"
      },
      primary: {
        50: "#f1ecff",
        100: "#d4c7ec",
        200: "#b6a4dc",
        300: "#997fcd",
        400: "#7c5abd",
        500: "#6341a4",
        600: "#4d3280",
        700: "#37245c",
        800: "#211539",
        900: "#0d0518"
      },
      secondary: {
        50: "#fff8da",
        100: "#ffebad",
        200: "#ffde7d",
        300: "#ffd04b",
        400: "#ffc31a",
        500: "#e6aa00",
        600: "#b38400",
        700: "#805e00",
        800: "#4e3900",
        900: "#1d1300"
      },
      success: {
        50: "#dbfdff",
        100: "#affffd",
        200: "#80fff6",
        300: "#51ffec",
        400: "#2cfedf",
        500: "#1de5bd",
        600: "#0db38e",
        700: "#008061",
        800: "#004d3f",
        900: "#001c16"
      }
    }
  },
  plugins: []
};
