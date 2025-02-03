"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ResetPasswordSchema } from "@/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconCircle,
  IconCircleCheckFilled,
  IconLoader2,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeToggle } from "../sign-up/page";
import { updatePassword } from "@/actions/actions";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  return (
    <section className="max-w-screen-xl mx-auto pt-20">
      <div className="max-w-96 mx-auto">
        <div className="mb-14">
          <h3 className="text-3xl tracking-tight">Create your Rine account</h3>
          <p className="text-muted-foreground">
            Please enter your email and password to sign up.
          </p>
        </div>
        <ForgotPasswordContainer />
      </div>
    </section>
  );
}

function ForgotPasswordContainer() {
  const [showMsg, setShowMsg] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
    },
  });

  const password = form.watch("password", "");

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
    charCount: "8 characters or more",
  };

  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    try {
      setLoading(true);
      const { success_message, error } = await updatePassword(values.password);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error me",
          description: error,
        });
        return;
      }

      toast({
        title: "Success",
        description:
          success_message || "Password has been successfully updated",
      });

      // Optionally redirect to login page
      // router.push('/login');
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative max-h-fit">
                    <Input
                      onFocus={() => setShowMsg(true)}
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pr-14"
                      {...field}
                    />
                    <EyeToggle
                      isVisible={isVisible}
                      toggleVisible={setIsVisible}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {showMsg && (
            <ul>
              <PasswordRequirement
                text={errorMsg.upper}
                isValid={hasUppercase}
              />
              <PasswordRequirement
                text={errorMsg.lower}
                isValid={hasLowercase}
              />
              <PasswordRequirement text={errorMsg.number} isValid={hasNumber} />
              <PasswordRequirement
                text={errorMsg.special}
                isValid={hasSpecialChar}
              />
              <PasswordRequirement
                text={errorMsg.charCount}
                isValid={hasMinLength}
              />
            </ul>
          )}
        </div>
        <Button type="submit" className="w-full py-2 h-auto" disabled={loading}>
          {loading && (
            <div className="[&_svg]:animate-spin">
              <IconLoader2 />
            </div>
          )}
          Reset password
        </Button>
      </form>
    </Form>
  );
}

function PasswordRequirement({
  text,
  isValid,
}: {
  text: string;
  isValid: boolean;
}) {
  return (
    <li
      className={`flex items-center gap-1.5 transition-colors ${
        isValid ? "text-neutral-300" : "text-neutral-500"
      }`}
    >
      {isValid ? <IconCircleCheckFilled size={18} /> : <IconCircle size={18} />}
      <span>{text}</span>
    </li>
  );
}
