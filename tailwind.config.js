module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Quicksand: ["Quicksand", "sans-serif"],
      },
      backgroundImage: {
        checkboardPattern:
          "repeating-conic-gradient(rgb(128, 128, 128) 0%, rgb(128, 128, 128) 25%, transparent 0%, transparent 50%)",
      },
      backgroundSize: {
        "20px": "20px 20px",
      },
      boxShadow: {
        hardShadow: "10px 8px black",
      },
    },
  },
  plugins: [],
};
