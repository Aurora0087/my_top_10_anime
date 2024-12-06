/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 's4.anilist.co',
            port:'',
          },
        ],
      },
      
      async redirects() {
        return [
          {
            source: '/api/:slug',
        destination: 'http://localhost:4000/:slug',
        permanent: true,
          },
        ]
      },
};

export default nextConfig;
