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

export async function handleEditForm(formData) {
  if (!formData) {
    console.error("Error: formData is null or undefined.");
    return redirect("/404");
  }

  const email = formData.get("email");

  if (!email) {
    console.error("Error: Email is missing from form data.");
    return redirect("/404");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error("Error: User not found.");
    return redirect("/404");
  }

  try {
    const updateData = {
      name: formData.get("name") || user.name,
      username: formData.get("username") || user.username,
      profileImage: formData.get("profileImage") || user.profileImage,
      bannerImage: formData.get("bannerImage") || user.bannerImage,
      github: formData.get("github") || user.github,
      linkedIn: formData.get("linkedIn") || user.linkedIn,
      location: formData.get("location") || user.location,
      title: formData.get("title") || user.title,
      bio: formData.get("bio") || user.bio,
    };

    const newPassword = formData.get("password");
    if (newPassword && newPassword.trim() !== "") {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    await prisma.user.update({
      where: { email },
      data: updateData,
    });

    console.log("User updated successfully!");

  } catch (error) {
    console.error("Error while updating user:", error);
    return redirect("/404");
  }

  return redirect(`/user/${email}`);
}
