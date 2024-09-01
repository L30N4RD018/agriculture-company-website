/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,        
    }    
};

export default nextConfig;
