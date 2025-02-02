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
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import { IconArrowLeft, IconCircleCheckFilled } from "@tabler/icons-react";
import { useState } from "react";

export default function SignUp() {
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
  const [success, setSuccess] = useState(false);
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
      title: "Account creation successful",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-neutral-900 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    setSuccess(true);
  }
  return (
    <>
      {!success ? (
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
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full py-2 h-auto">Sign up</Button>
          </form>
        </Form>
      ) : (
        <SuccessScreen setSuccess={setSuccess} />
      )}
    </>
  );
}

function SuccessScreen({ setSuccess }: { setSuccess: (s: boolean) => void }) {
  return (
    <div className="space-y-4">
      <span
        className="text-muted-foreground text-sm flex items-center gap-2 cursor-pointer"
        onClick={() => setSuccess(false)}
      >
        <IconArrowLeft size={18} />
        Back
      </span>
      <IconCircleCheckFilled size={56} />
      <h2>Please check your email</h2>
      <Button className="w-full">Open Gmail</Button>
    </div>
  );
}
