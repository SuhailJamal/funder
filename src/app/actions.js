"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
export async function handleSignUp(formData) {
  const user = await prisma.User.findUnique({
    where: {
      email: formData.get("email"),
    },
  });
  if (user) {
    redirect("/login");
  }
  try {
    const hashedPassword = await bcrypt.hash(formData.get("password"), 10);
    const newUser = await prisma.User.create({
      data: {
        name: `${formData.get("firstname")} ${formData.get("lastname")}`,
        email: formData.get("email"),
        password:hashedPassword
      },
    });
  } catch (e) {
    console.error("Error while connecting to the database:", e);
    redirect("/404");
  }
  redirect('/login');
}
