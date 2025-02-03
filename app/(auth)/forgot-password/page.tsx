"use client";

import { forgotPassword } from "@/actions/actions";
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
import { ForgotPasswordSchema } from "@/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(value: z.infer<typeof ForgotPasswordSchema>) {
    try {
      setLoading(true);
      const { email } = value;
      const { success_message, error } = await forgotPassword(email);

      if (success_message) {
        toast({
          title: "Success",
          description: success_message,
        });
        form.reset();
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="max-w-screen-xl mx-auto pt-20">
      <div className="max-w-96 mx-auto">
        <div className="mb-14">
          <h3 className="text-3xl tracking-tight">Forgot password</h3>
          <p className="text-muted-foreground">
            Please enter your email to get a link.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <Button type="submit" className="w-full">
              {loading && (
                <div className="[&_svg]:animate-spin">
                  <IconLoader2 />
                </div>
              )}
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
