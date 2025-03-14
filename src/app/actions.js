"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
export async function handleSignUp(formData) {
  console.log("the user data email is ", formData.get("email"));
  const user = await prisma.User.findUnique({
    where: {
      email: formData.get("email"),
    },
  });
  if (user) {
    redirect("/login");
  }

  const hashedPassword = await bcrypt.hash(formData.get("password"), 10);

  const name = `${formData.get("firstname")} ${formData.get("lastname")}`;

  const email = formData.get("email").toLowerCase();

  const username = email.split("@")[0];
  await prisma.User.create({
    data: {
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    },
  });

  redirect("/login");
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

    console.log(`User updated successfully! with email ${email}`);
  } catch (error) {
    console.error("Error while updating user:", error);
    return redirect("/404");
  }

  return redirect(`/user/${email}`);
}

export async function handlePaymentForm(formData) {
  console.log(formData);
  const donationName = formData.get("name");
  const donationMessage = formData.get("message");
  const donarEmail = formData.get("donarUserEmail");
  const receiverEmail = formData.get("receiverUserEmail");
  const donationAmount = formData.get("amount");

  const donar = await prisma.User.findUnique({
    where: {
      email: donarEmail,
    },
  });
  const receiver = await prisma.User.findUnique({
    where: {
      email: receiverEmail,
    },
  });

  await prisma.Donation.create({
    data: {
      donar_name: donar?.name || "Anonymous Donor",
      receiver_name: receiver?.name || "Anonymous Receiver",
      donar_image:
        donar?.profileImage ||
        "https://lirp.cdn-website.com/eda4ad32/dms3rep/multi/opt/41717CF9-288E-4F9C-BF86-9E35DA494F87-640w.jpg",
      donation_amount: parseInt(donationAmount),
      donation_message: donationMessage?.trim() || "No message provided",
    },
  });
  revalidatePath(`/user/${receiverEmail}`);
}
