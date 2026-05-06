import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IEDC MGMCET',
    short_name: 'IEDC MGMCET',
    description: 'Innovation & Entrepreneurship Development Centre at MGM College of Engineering and Technology, Pampakuda, Kerala',
    start_url: '/',
    display: 'standalone',
    theme_color: "#ffffff",
    background_color: "#ffffff",
    lang: 'en-IN',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}