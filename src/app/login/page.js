"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
   
    router.push(`/user/${session.user.email}`);
  }
  const handleLogin = async (formData) => {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };

  return (
    <div className="w-full dark:bg-gray-900 py-5">
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200" >
        Welcome to Funder
      </h2>
      
      <form className="my-8" action = {handleLogin}>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name = "email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" name = "password" />
        </LabelInputContainer>

        <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit">
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <SocialLoginButton icon={<IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />} text="GitHub" onClick = {()=>signIn("github")} />
          <SocialLoginButton icon={<IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />} text="Google" onClick = {()=>signIn('google')} />
          
        </div>
      </form>
    </div>
    </div>
  );
};


const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

const SocialLoginButton = ({ icon, text, onClick }) => (
  <button className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]" type="button"
  onClick={onClick}>
    {icon}
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">{text}</span>
    <BottomGradient />
  </button>
);

export default Login;
