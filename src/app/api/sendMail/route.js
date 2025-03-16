import transporter from "@/lib/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, name } = await req.json();
    await transporter.sendMail({
      from: '"Funder Security" <erenyeager58.sj@gmail.com>',
      to: email,
      subject: "🔒 Security Alert: New Login Detected",
      html: `<p>Hello <b>${name}</b>,</p><p>We've detected a login to your Funder account.</p>`,
    });
     return NextResponse.json(
      { success: true, message: "Message sent Successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error sending the email");
    return NextResponse.json(
      { sucess: false, message: "Message not sent" },
      { status: 500 }
    );
  }
}
