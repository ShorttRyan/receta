/** @type {import('next').NextConfig} */
const path = require('path')
const withPWA = require("next-pwa")

const nextConfig = withPWA({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  }
})

module.exports = nextConfig
