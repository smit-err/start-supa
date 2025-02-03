"use client";

import { Form } from "@/components/ui/form";
import { SignUpFormSchema } from "@/zod/schema";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getCurrentSession, signin } from "@/actions/actions";
import { useToast } from "@/hooks/use-toast";
import { IconLoader2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import CustomFormField from "@/components/custom-form-field";
import PasswordField from "@/components/password-field";
import { redirect, useRouter } from "next/navigation";

export default function SignIn() {
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
          <h3 className="text-3xl tracking-tight">Welcome back to Rine</h3>
          <p className="text-muted-foreground">
            Please enter your email and password to continue.
          </p>
        </div>
        <SignInForm />
      </div>
    </section>
  );
}

function SignInForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    try {
      setLoading(true);
      const response = await signin(values);

      if (response?.zod_errors) {
        const fieldErrors = response.zod_errors;

        form.clearErrors();

        Object.keys(fieldErrors).forEach((field) => {
          const errorMessages = fieldErrors[field as keyof typeof fieldErrors];
          if (Array.isArray(errorMessages) && errorMessages?.length > 0) {
            form.setError(
              field as "email" | "password" | "root" | `root.${string}`,
              { message: errorMessages[0] }
            ); // Set the first error
          }
        });
      }

      if (response.error) {
        form.setError("email", {
          message: response.error,
        });
        form.setError("password", {
          message: response.error,
        });
      }

      if (response?.success_message) {
        // setSuccess(true);
        toast({
          title: "Sign in successfull",
          description: response.success_message,
        });

        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Sign in failed: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-5">
          <CustomFormField
            control={form.control}
            name="email"
            placeholder="smit@gmail.com"
            label="Email"
          />

          <PasswordField
            control={form.control}
            label="Password"
            name="password"
            placeholder="Enter your password"
            togglePasswordVisibility={visible}
            setTogglePasswordVisibility={setVisible}
          />
        </div>

        <Button className="w-full py-2 h-auto" disabled={loading}>
          {loading && (
            <div className="[&_svg]:animate-spin">
              <IconLoader2 />
            </div>
          )}
          Sign in
        </Button>
      </form>
    </Form>
  );
}
