import { SignUpInput } from "@/lib/schemas/auth/signup.schema";
import { env } from "@/lib/schemas/env";
import { cookies } from "next/headers";
import parse, { Cookie } from 'set-cookie-parser';
import { SignInInput } from "../schemas/auth/signin.schema";
import { redirect } from "next/navigation";

export const setCookie = async (cookiesHeader: string[]) => {
  const parsedCookies: Cookie[] = parse(cookiesHeader);
  const cookieStore = await cookies();

  parsedCookies.forEach((cookie) => {
    cookieStore.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite as 'lax' | 'strict' | 'none',
      path: cookie.path,
      maxAge: cookie.maxAge,
      // expires: cookie.expires,
    });
  });
}

export const authService = {
  signUp: async (data: SignUpInput) => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.mail,
          password: data.password,
          acceptTerms: data.terms
        }),
      });
      const cookiesHeaders: string[] = response.headers.getSetCookie()

      await setCookie(cookiesHeaders)

      const result = await response.json();

      if (!response.ok) {
        // throw new Error(result.message || "An error occurred during sign up");
        return { ok: false, result }
      }

      return { ok: true, result }
    } catch (error) {
      console.error("Sign Up Service Error:", error);
      throw error;
    }
  },
  signIn: async (data: SignInInput) => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.mail,
          password: data.password,
          rememberMe: data.remember
        }),
      });
      const cookiesHeaders: string[] = response.headers.getSetCookie()

      await setCookie(cookiesHeaders)

      const result = await response.json();

      if (!response.ok) {
        return { ok: false, result }
      }

      return { ok: true, result }
    } catch (error) {
      console.error("Sign In Service Error:", error);
      throw error;
    }
  },
  logout: async () => {
    "use server"
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    // redirect() dentro de una Server Action invalida el caché automáticamente
    redirect("/");
  }
};
