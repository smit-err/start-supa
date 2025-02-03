"use client";

import { Form } from "@/components/ui/form";
import { SignUpFormSchema } from "@/zod/schema";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getCurrentSession, signup } from "@/actions/actions";
import CustomFormField from "@/components/custom-form-field";
import PasswordField from "@/components/password-field";
import { useToast } from "@/hooks/use-toast";
import { IconLoader2 } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUp() {
  useEffect(() => {
    async function getUser() {
      const { user } = await getCurrentSession();
      if (user) {
        redirect("/dashboard");
      }
    }

    getUser();
  }, []);

  return (
    <section className="max-w-screen-xl mx-auto pt-20">
      <div className="max-w-96 mx-auto">
        <div className="mb-14">
          <h3 className="text-3xl tracking-tight">Create your Rine account</h3>
          <p className="text-muted-foreground">
            Please enter your email and password to sign up.
          </p>
        </div>
        <SignUpForm />
      </div>
    </section>
  );
}

function SignUpForm() {
  const [showMsg, setShowMsg] = useState(false); // shows msg list when clicked on password input
  const [isVisible, setIsVisible] = useState(false); // password visible toggle
  const [loading, setLoading] = useState(false); // set loading when submitting
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const password = form.watch("password", "");

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    try {
      setLoading(true);
      const response = await signup(values);
      if (response?.zod_errors || response?.error) {
        form.clearErrors();

        // Handle Zod validation errors
        if (response.zod_errors) {
          const fieldErrors = response.zod_errors;
          Object.keys(fieldErrors).forEach((field) => {
            const errorMessages =
              fieldErrors[field as keyof typeof fieldErrors];
            if (Array.isArray(errorMessages) && errorMessages?.length > 0) {
              form.setError(
                field as "email" | "password" | "root" | `root.${string}`,
                { message: errorMessages[0] }
              );
            }
          });
        }

        // Handle Supabase errors
        if (response.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: response.error,
          });
        }
      }

      if (response?.success_message) {
        // setSuccess(true);
        toast({
          title: "Account creation successfull",
          description: response.success_message,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup failed: ", error);
    } finally {
      setLoading(false);
    }
  }

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[@$!%*?&]/;
  const minLengthRegex = /^.{8,}$/;

  const hasUppercase = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);
  const hasMinLength = minLengthRegex.test(password);

  const errorMsg = {
    upper: "Uppercase letter",
    lower: "Lowercase letter",
    number: "Number",
    special: "Special character (e.g. !?<>@#$%)",
    count: "8 characters or more",
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-5">
          <CustomFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="smit@gmail.com"
          />

          <PasswordField
            control={form.control}
            name="password"
            placeholder="Enter your password"
            label="Password"
            errorMsg={errorMsg}
            hasUpper={hasUppercase}
            hasLower={hasLowercase}
            hasCount={hasMinLength}
            hasSpecial={hasSpecialChar}
            hasNumber={hasNumber}
            showMsg={showMsg}
            setShowMsg={setShowMsg}
            togglePasswordVisibility={isVisible}
            setTogglePasswordVisibility={setIsVisible}
          />
        </div>

        <Button type="submit" className="w-full py-2 h-auto" disabled={loading}>
          {loading && (
            <div className="[&_svg]:animate-spin">
              <IconLoader2 />
            </div>
          )}
          Sign up
        </Button>
      </form>
    </Form>
  );
}
