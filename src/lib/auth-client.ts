import { createAuthClient } from "better-auth/react";

const baseURL = import.meta.env.VITE_FRONTEND_URL;

export const authClient = createAuthClient({
  baseURL,
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
	},
});

export const { signIn, signUp, useSession, signOut } = authClient;

