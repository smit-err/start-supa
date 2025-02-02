"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignUpFormSchema } from "@/zod/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
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
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    toast({
      title: "Sign in successful",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-neutral-900 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="smit@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <Link href={"/forgot-password"} className="text-sm underline">
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full py-2 h-auto">Sign in</Button>
      </form>
    </Form>
  );
}
