# My Social Space

## Overview

This project is a robust web application built with the latest technologies and tools to ensure scalability, maintainability, and user-friendly experience. It incorporates state management, custom API hooks, and authentication mechanisms with private and public route handling.

## Features

- **Custom Hook for API Calls**: Used to streamline and simplify API requests.
- **Authentication**:
  - Private and public route authentication.
  - User authentication with a custom authentication page.
- **State Management**: Implemented using Redux Toolkit and Redux Persist.
- **Error Notifications**: Integrated with `react-hot-toast` to provide error feedback.
- **Server-side API Calls**: Dedicated server API call hooks for seamless backend communication.
- **Code Quality and Formatting**:
  - Configured **Husky** for pre-commit hooks to ensure code standards.
  - Integrated **ESLint** for linting and maintaining consistent coding standards.
  - Utilized **Prettier** for automatic code formatting.

## Technologies Used

The following libraries and frameworks were utilized in this project:

| Package Name        | Version          |
|---------------------|------------------|
| @reduxjs/toolkit    | ^2.5.0           |
| axios               | ^1.7.9           |
| js-cookie           | ^3.0.5           |
| jsonwebtoken        | ^9.0.2           |
| lucide-react        | ^0.468.0         |
| next                | 15.0.3           |
| next-auth           | ^5.0.0-beta.25   |
| react               | ^19.0.0 (stable) |
| react-dom           | ^19.0.0          |
| react-hot-toast     | ^2.4.1           |
| react-redux         | ^9.2.0           |
| redux-persist       | ^6.0.0           |
| eslint              | Configured       |
| prettier            | Configured       |
| husky               | Configured       |

## Key Highlights

### State Management
- Redux Toolkit for state management with simplified configurations.
- Redux Persist for state persistence across sessions.

### API Calls
- Custom hooks to handle both client-side and server-side API requests, ensuring clean and reusable code.

### Authentication
- Integrated `next-auth` for managing user sessions and authentication flow.
- Implemented custom authentication for handling both public and private routes.

### Notifications
- Integrated `react-hot-toast` for displaying error messages and other notifications.

### Code Quality
- Configured **Husky** to enforce pre-commit checks, ensuring only linted and formatted code is committed.
- Leveraged **ESLint** to maintain consistent coding practices.
- Utilized **Prettier** for automatic formatting of code.

### Modern UI Components
- Leveraged `lucide-react` for a modern and lightweight icon system.

## Folder Structure

```plaintext
src/
├── components/      # Reusable UI components
├── hooks/           # Custom hooks including API call hooks
├── pages/           # Next.js pages
├── redux/           # Redux state slices and store configuration
├── utils/           # Utility functions and configuration files
