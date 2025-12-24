import { SignUpInput } from "@/lib/schemas/auth/signup.schema";
import { env } from "@/lib/schemas/env";
import { cookies } from "next/headers";
import parse, {Cookie} from 'set-cookie-parser';

export const authService = {
  /**
   * Registers a new user in the backend
   * @param data Validated sign up data
   */
  signUp: async (data: SignUpInput) => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.mail,
          password: data.password,
          // No enviamos confirmPassword al backend, solo lo usamos para validación en el cliente
        }),
      });
      const setCookieHeaders: string[] = response.headers.getSetCookie()

      const parsedCookies: Cookie[] = parse(setCookieHeaders);
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

      const result = await response.json();

      if (!response.ok) {
        // Lanzamos un error con el mensaje que venga del backend o uno genérico
        throw new Error(result.message || "An error occurred during sign up");
      }

      return result;
    } catch (error) {
      console.error("Sign Up Service Error:", error);
      throw error;
    }
  },
};
