module.exports = {
  corePlugins: {
    // preflight: false,
  },
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      textColor: {
        default: "var(--color-text-default)",
      },
      backgroundColor: {
        html: "var(--color-bg-html)",
        content: "var(--color-bg-content)",
        block: "var(--color-bg-block)",
      },
    },
  },
  variants: {},
  plugins: [],
};
