import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  remotePatterns:[
    {
      protocol:"https",
      hostname:"i.imgur.com"
    },
    {
      protocol:"https",
      hostname:"my-social-space.s3.ap-south-1.amazonaws.com"
    }
  ]
 }
};

export default nextConfig;
