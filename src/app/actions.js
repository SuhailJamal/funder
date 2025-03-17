"use server";
import transporter from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
export async function handleSignUp(formData) {
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
  const welcomeEmailHTML = (userName) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Funder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background: linear-gradient(to right, #6a11cb, #2575fc);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            padding: 15px;
            border-top: 1px solid #ddd;
        }
        .btn {
            display: inline-block;
            background: #6a11cb;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 15px;
        }
        .btn:hover {
            background: #2575fc;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Funder, ${userName}!</h1>
        </div>
        <div class="content">
            <p>Thank you for signing up with <b>Funder</b>! 🎉</p>
            <p>We are thrilled to have you on board. You can now start creating and supporting fundraisers to make a real impact.</p>
            <p>Here’s what you can do next:</p>
            <ul>
                <li>✔️ Set up your profile and fundraising goals.</li>
                <li>✔️ Explore and support fundraisers that inspire you.</li>
                <li>✔️ Share your campaign to reach more supporters.</li>
            </ul>
            
        </div>
        <div class="footer">
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:support@funder.com">support@funder.com</a></p>
            <p>Best Regards, <br> The Funder Team</p>
        </div>
    </div>
</body>
</html>
`;
  await transporter.sendMail({
    from: '"Funder" <erenyeager58.sj@gmail.com>', // sender address
    to: email, // list of receivers
    subject: `Welcome to Funder ${name}`, // Subject line
    html: welcomeEmailHTML(name), // html body
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

    await prisma.User.update({
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
export async function handleContactForm(formData) {
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const subject = formData.get("subject");
  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #4A90E2; text-align: center;">Thank You for Contacting Funder!</h2>
      <p>Dear <strong>${firstName}</strong>,</p>
      <p>We have received your request regarding <strong>"${subject}"</strong>. Our team will review your inquiry and get back to you as soon as possible.</p>
      <p>If you have any urgent concerns, feel free to reach out to us directly.</p>
      <p style="text-align: center; margin-top: 20px;"><strong>Best Regards,</strong></p>
      <p style="text-align: center; color: #555;">The Funder Team</p>
      <hr>
      <p style="font-size: 12px; text-align: center; color: #888;">This is an automated message. Please do not reply.</p>
    </div>
  `;
  const info = await transporter.sendMail({
    from: '"Funder Support" <erenyeager58.sj@gmail.com>', // sender address
    to: email, // list of receivers
    subject: `Acknowledgment: ${subject}`, // Subject line
    html: emailHTML, // html body
  });
  console.log("Message sent with id", info.messageId);
}

export async function handleHiringForm(formData) {
  console.log(formData);
  const email = formData.get("email");
  const interestedIn = formData.get("interestedIn");
  const name = formData.get("name");
  const message = formData.get("message");
  const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #2c3e50; text-align: center;">🚀 Hiring Application Received!</h2>
        <p>Hello <b>${name}</b>,</p>
        <p>Thank you for your interest in joining <b>Funder</b>. We have received your application for the role of <b>${interestedIn}</b> and will review your submission.</p>
        <h3 style="color: #3498db;">Your Submission Details:</h3>
        <p><b>Role Applied For:</b> ${interestedIn}</p>
        <p><b>Field of Interest:</b> ${interestedIn}</p>
        <p><b>Your Message:</b> ${message}</p>
        <hr>
        <p>We appreciate your interest in working with us. Our team will get back to you as soon as possible.</p>
        <p style="font-size: 14px; color: #555;">Best regards,</p>
        <p style="font-size: 14px; color: #555;"><b>Funder Hiring Team</b></p>
      </div>
    `;

  await transporter.sendMail({
    from: '"Funder Hiring Team" <erenyeager58.sj@gmail.com>',
    to: email,
    subject: `📩 Hiring Application Received: ${interestedIn}`,
    html: emailHTML,
  });
}

export async function handlePostCreateForm(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const imageUrl = formData.get("imageUrl") || "";
  const userEmail = formData.get("userEmail");
  const user = await  prisma.User.findUnique({
    where: {
      email : userEmail
    }
  })
  const userProfileImage = user.profileImage;
  const userName = user.name || "Anonymous";
  await prisma.Post.create({
    data: {
      title,
      description,
      category,
      imageUrl,
      userEmail,
      userProfileImage,
      userName
    },
  });
}
