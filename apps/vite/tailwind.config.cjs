/** @type {import("tailwindcss").config} */
module.exports = {
  presets: [require("@acme/tailwind-config")],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
};
