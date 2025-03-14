import { AnimatedTestimonials } from "@/components/ui/AnimatedTestimonials";

export default function Testimonials() {
  const testimonialsData = [
    {
      "quote":
        "Funder made it incredibly easy for me to raise funds for my medical treatment. The platform is secure, transparent, and user-friendly!",
      "name": "Sophia Patel",
      "designation": "Medical Fundraiser",
      "src": "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "quote":
        "The best platform for social causes! Our non-profit successfully raised funds to support underprivileged children, thanks to Funder’s seamless donation system.",
      "name": "Daniel Lee",
      "designation": "Founder at Hope Foundation",
      "src": "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "quote":
        "I never thought fundraising could be this easy! The campaign setup took just minutes, and the support team was always there to help.",
      "name": "Emily Carter",
      "designation": "Student Fundraiser",
      "src": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "quote":
        "Funder is a game-changer! The ability to track donations in real-time and withdraw funds easily makes it the best fundraising platform I’ve used.",
      "name": "James Nolan",
      "designation": "Entrepreneur & Small Business Owner",
      "src": "https://images.unsplash.com/photo-1531561855568-3036cd4f03ba?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "quote":
        "From setup to sharing my campaign, everything was effortless. I was able to raise funds for my startup idea in just a few weeks!",
      "name": "Olivia Martinez",
      "designation": "Startup Founder",
      "src": "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

  return <AnimatedTestimonials testimonials={testimonialsData} />;
}
