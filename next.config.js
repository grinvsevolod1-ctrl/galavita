const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: "standalone",

  // 🔧 Отключаем ошибки ESLint при сборке
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
