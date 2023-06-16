/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./app/**/*.tsx"],
  // @ts-ignore
  presets: [require("@igloo/tailwind-config")],
};

module.exports = config;
