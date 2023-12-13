/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  env: {
    URL_BACKEND: "https://api.ayudassociales.bahia.gob.ar/",
  },
};

module.exports = nextConfig;
