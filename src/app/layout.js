
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Poppins, Rubik } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";


const rubik = Rubik({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-rubik",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins", // Optional: Define a CSS variable
});

export const metadata = {
  title: "Funder",
  description: "Website to raise funds for causes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
      <body
        className={`${poppins.variable} ${rubik.variable} antialiased`}
      >
        
          <Navbar />
          {children}
          <Footer />
        
      </body>
      </SessionWrapper>
    </html>
  );
}
