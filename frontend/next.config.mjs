/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: "/api/users",
                destination: "http://localhost:4000/api/users",
            }
        ]
    }
};

export default nextConfig;
