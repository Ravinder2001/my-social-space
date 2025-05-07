const Config = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
  JWT_SECRET: process.env.JWT_SECRET,
};
export default Config;
