import { AuthPage, Content } from "@/auth-pages/auth-page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";

import { IconBrandGoogleFilled, IconBrandX } from "@tabler/icons-react";

export default function Demo() {
  return (
    <AuthPage className="rounded-lg p-4 selection:text-white selection:bg-black">
      <Content className="col-span-3 col-end-3 flex mt-24">
        <div className="flex flex-col space-y-20 max-w-md mx-auto">
          <div>
            <div className="flex space-x-2">
              <div className="rounded bg-primary p-1.5">
                <div className="h-4 w-4 rounded-sm bg-white" />
              </div>
              <span className="text-xl font-semibold">Rine</span>
            </div>
          </div>
          <div className="space-y-7">
            <h1 className="text-2xl font-semibold">Create an account</h1>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full gap-2 h-auto [&_svg]:size-5 rounded-lg"
              >
                <IconBrandGoogleFilled />
                Sign in with Google
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 h-auto [&_svg]:size-5 rounded-lg"
              >
                <IconBrandX />
                Sign in with X
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  OR
                </span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password*</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-lg gap-2 py-3 h-auto [&_svg]:size-5"
                >
                  Create account
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-medium underline">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Content className="plac-self-end space-y-8 overflow-hidden bg-neutral-100 pl-20 pt-16 rounded-2xl col-start-3 maxi">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight leading-9">
            Go from idea to done with Rine
          </h1>
          <p>
            Store, share, and publish your files in the cloud. Keep your entire
            team on the same page.
          </p>
        </div>
        <div className="overflow-hidden max-h-[768px]">
          <Image
            src={"/placeholder.webp"}
            width={1024}
            height={768}
            alt="IMage"
            className="rounded-tl-lg w-full aspect-auto"
          />
        </div>
      </Content>
    </AuthPage>
  );
}
