const Constants = {
  LOCAL_STORAGE_KEY: "key-name",
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/,
  PROVIDERS: {
    GOOGLE: "google",
    GITHUB: "github",
    CREDENTIALS: "Credentials",
  },
  COMMAN: {
    OBJECT: "object",
    CREDENTIALS: "credentials",
  },
};
export default Constants;
