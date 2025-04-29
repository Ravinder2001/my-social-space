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
    CREATE_POST: "/post",
    EDIT_POST: "/post",
    GET_ALL_POST: "/post",
    GENERATE_CAPTION: "/post/generate-caption",
    TOGGLE_LIKE: "/post/toggleLike",
    TOGGLE_SAVE: "/post/toggleSave",
    FETCH_COMMENTS: "/post/comments",
    ADD_COMMENT: "/post/comments",
    SEARCH_USERS: "/friend/searchUsers",
    PROFILE_POSTS: "/profile/posts",
    PROFILE_PHOTOS: "/profile/photos",
    PROFILE_SAVED: "/profile/saved",
    EDIT_PROFILE_DETAILS: "/profile",
    GET_PROFILE_DETAILS: "/profile",
    VALIDATE_USERNAME: "/profile/validateUsername",
    SEND_REQUEST:"/friend/requests"
  },
};

export default CONSTANTS;
