export default {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      },
      {
        protocol: 'https',
        hostname: '102922.selcdn.ru',
        port: '',
        pathname: '/nomenclature_images_test/**',
        search: '',
      },
    ],
  }
};