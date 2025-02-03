import * as React from "react";

import { cn } from "@/lib/utils";

const AuthPage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid grid-cols-8 min-h-screen", className)}
    {...props}
  />
));
AuthPage.displayName = "AuthPage";

const Content = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
Content.displayName = "Content";

export { AuthPage, Content };
