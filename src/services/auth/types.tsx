// Define the structure for the user object
export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

// Define the structure for the JWT and user session data
export interface UserResponse {
  jwt: string;
  user: User;
}

/**
 * Type for login payload.
 * This represents the structure of the data required to login a user.
 */
export interface LoginPayload {
  identifier: string;
  password: string;
}

/**
 * Type for register payload.
 * This represents the structure of the data required to register a new user.
 */
export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}
