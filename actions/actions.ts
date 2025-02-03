"use server";

import { z } from "zod";
import { SignUpFormSchema } from "@/zod/schema";
import createClient from "@/utils/supabase/server";
import { AuthError, Provider } from "@supabase/supabase-js";

type AuthResponse = {
  success?: boolean;
  success_message?: string;
  error?: string;
  zod_errors?: z.inferFlattenedErrors<typeof SignUpFormSchema>["fieldErrors"];
};

export async function signup(
  input_data: z.infer<typeof SignUpFormSchema>
): Promise<AuthResponse> {
  try {
    // Validate input data
    const validatedFields = SignUpFormSchema.safeParse(input_data);
    if (!validatedFields.success) {
      return {
        success: false,
        zod_errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp(validatedFields.data);

    if (error) {
      throw error;
    }

    if (!data.user) {
      return {
        success: false,
        error: "Failed to create user account",
      };
    }

    return {
      success: true,
      success_message:
        "Sign up successful. Please check your email for verification.",
    };
  } catch (error) {
    console.error("[Auth] Signup error:", error);
    return {
      success: false,
      error:
        error instanceof AuthError
          ? error.message
          : "An unexpected error occurred during sign up",
    };
  }
}

export async function signin(
  input_data: z.infer<typeof SignUpFormSchema>
): Promise<AuthResponse> {
  try {
    // Validate input data
    const validatedFields = SignUpFormSchema.safeParse(input_data);
    if (!validatedFields.success) {
      return {
        success: false,
        zod_errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword(
      validatedFields.data
    );

    if (error) {
      throw error;
    }

    if (!data.user) {
      return {
        success: false,
        error: "Invalid credentials",
      };
    }

    return {
      success: true,
      success_message: "Sign in successful",
    };
  } catch (error) {
    console.error("[Auth] Signin error:", error);
    return {
      success: false,
      error:
        error instanceof AuthError
          ? error.message
          : "An unexpected error occurred during sign in",
    };
  }
}

export async function forgotPassword(email: string): Promise<AuthResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      success_message: "Password reset instructions sent to your email",
    };
  } catch (error) {
    console.error("[Auth] Forgot password error:", error);
    return {
      success: false,
      error:
        error instanceof AuthError
          ? error.message
          : "An unexpected error occurred while processing your request",
    };
  }
}

export async function signInWithOauth(provider: string): Promise<AuthResponse> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    if (!data) {
      return {
        success: false,
        error: "Failed to initiate OAuth sign in",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("[Auth] OAuth signin error:", error);
    return {
      success: false,
      error:
        error instanceof AuthError
          ? error.message
          : "An unexpected error occurred during OAuth sign in",
    };
  }
}

export async function signout(): Promise<AuthResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return {
      success: true,
      success_message: "Successfully signed out",
    };
  } catch (error) {
    console.error("[Auth] Signout error:", error);
    return {
      success: false,
      error:
        error instanceof AuthError
          ? error.message
          : "An unexpected error occurred during sign out",
    };
  }
}

export async function getCurrentSession() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    return {
      success: true,
      user,
    };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function updatePassword(
  newPassword: string
): Promise<AuthResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    return {
      success: true,
      success_message: "Password updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof AuthError
          ? error.message
          : "An unexpected error occurred during sign out",
    };
  }
}
