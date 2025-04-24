const CONSTANTS = {
  PROJECT_ROUTES: {
    PRIVATE_ROUTES: {
      HOME: "/",
      EXPLORE: "/explore",
      MESSAGES: "/messages",
      NOTIFICATIONS: "/notifications",
      PROFILE: "/profile",
      SETTINGS: "/settings",
    },
    PUBLIC_ROUTES: {
      LOGIN: "/login",
      REGISTER: "/register",
    },
  },
  API_ROUTES: {
    LOGIN: "/user/login",
    SIGNUP: "/user/register",
    GOOGLE_SIGNIN: "/user/google-signin",
    CREATE_POST:"/post"
  },
};

export default CONSTANTS;
