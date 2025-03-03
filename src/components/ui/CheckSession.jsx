"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
export default function CheckSession() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    // Extract the username from the route
    const pathParts = pathname.split("/");
    const routeUsername = pathParts[2];
    if (!session?.user || session.user.email !== routeUsername) {
      router.push("/unauthorized"); // Redirect unauthorized users
    }
  }, [session, status, pathname, router]);

  if (status === "loading") return <p>Loading...</p>;
  return <></>;
}
