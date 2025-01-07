const Messages = {
  validation: {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    password: "Password must be at least 8 characters long.",
    confirmPassword: "Passwords do not match.",
    maxLength: (field: string, max: string) => `${field} must not exceed ${max} characters.`,
    minLength: (field: string, min: string) => `${field} must be at least ${min} characters.`,
    invalidFormat: "The format is invalid.",
  },
  errors: {
    network: "Network error. Please try again later.",
    server: "An error occurred on the server. Please try again.",
    forbidden: "You do not have permission to perform this action.",
    notFound: "The requested resource was not found.",
  },
  success: {
    saved: "Your changes have been saved successfully.",
    submitted: "Form submitted successfully.",
    deleted: "The item was deleted successfully.",
    updated: "The record has been updated successfully.",
  },
  warnings: {
    unsavedChanges: "You have unsaved changes. Do you want to leave without saving?",
    sessionExpired: "Your session has expired. Please log in again.",
    deleteConfirmation: "Are you sure you want to delete this item?",
  },
  info: {
    loading: "Loading, please wait...",
    noData: "No data available.",
    welcome: "Welcome to the application!",
  },
  jwt: {
    errors: {
      invalidToken: "Invalid token. Please log in again.",
      expiredToken: "Your session has expired. Please log in again.",
      missingToken: "Authentication token is missing.",
      unauthorized: "You are not authorized to access this resource.",
    },
    success: {
      tokenRefreshed: "Your session has been refreshed successfully.",
      tokenValid: "Authentication successful.",
    },
    warnings: {
      nearingExpiry: "Your session is about to expire. Please refresh your token.",
    },
    info: {
      verifying: "Verifying authentication token...",
    },
  },
};

export default Messages;
