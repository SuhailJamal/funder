"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
export async function handleLoginForm(formData) {
  try {
    const existingUser = await prisma.User.findOne({
      where: {
        email: formData.get("email"),
      },
    });

    if (!existingUser) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.log("Error while signing in the user : ", e);
  }
}
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
    const newUser = await prisma.User.create({
      data: {
        name: `${formData.get("firstname")} ${formData.get("lastname")}`,
        email: formData.get("email"),
        password: formData.get("password"),
      },
    });
    redirect("/login");
  } catch (e) {
    console.error("Error while connecting to the database:", e);
    redirect("/404");
  }
}
