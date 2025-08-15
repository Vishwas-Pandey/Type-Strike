export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fall: "fall var(--fall-speed, 5s) linear forwards",
        twinkle: "twinkle 2s infinite",
      },
      keyframes: {
        fall: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(90vh)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
      },
    },
  },
  plugins: [],
};
