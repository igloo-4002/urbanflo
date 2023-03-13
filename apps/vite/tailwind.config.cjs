/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.tsx"],
  presets: [require("@igloo/tailwind-config")],
};

module.exports = config;
