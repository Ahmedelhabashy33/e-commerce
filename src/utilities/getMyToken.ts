"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken(): Promise<string | null> {
  try {
    const decodedToken =
      (await cookies()).get("next-auth.session-token")?.value ||
      (await cookies()).get("__Secure-next-auth.session-token")?.value;

    if (!decodedToken) return null;

    const tokenData = await decode({
      token: decodedToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    if (!tokenData || typeof tokenData.token !== "string") {
      return null;
    }

    return tokenData.token;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; 
  }
}
