/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    ALCHEMY_GAS_POLICY_ID: process.env.ALCHEMY_GAS_POLICY_ID,
    OX_API_KEY: process.env.OX_API_KEY,
  },
};

export default nextConfig;
