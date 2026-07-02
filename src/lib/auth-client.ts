import { createAuthClient } from "better-auth/react";

const baseURL = import.meta.env.VITE_BETTER_AUTH_CLIENT || "/api/auth";

export const authClient = createAuthClient({
	baseURL,
	fetchOptions: {
		credentials: "include",
	},
});

export const { signIn, signUp, useSession, signOut } = authClient;

