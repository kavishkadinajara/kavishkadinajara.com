import React from "react";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandFacebook,
} from "@tabler/icons-react";
import Image from "next/image";

import { FloatingDock } from "@/components/ui/floating-dock";

export function FloatingDockDemo() {
  const links = [
    // {
    //   title: "Home",
    //   icon: <IconHome className="w-6 h-6 text-neutral-500" />, // Uniform sizing
    //   href: "#",
    // },
    {
      title: "Linkind",
      icon: <IconBrandLinkedin className="w-6 h-6 text-neutral-500" />, // Uniform sizing
      href: "https://linkedin.com/in/kavishka-dinajara-502b011b3",
    },
    {
      title: "Facebook",
      icon: <IconBrandFacebook className="w-6 h-6 text-neutral-500" />, // Uniform sizing
      href: "https://facebook.com/kavishka.dinajara",
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="w-6 h-6 text-neutral-500" />, // Uniform sizing
      href: "https://instagram.com/kavishka_dinajara",
    },
    {
      title: "Dev Community",
      icon: (
        <Image
          alt="Dev.to Logo"
          className="w-6 h-6 object-contain" // Consistent class
          height={24} // Ensure consistent height
          src="/dev-black.png"
          width={24} // Ensure consistent width
        />
      ),
      href: "https://dev.to/kavishka_dinajara_88",
    },
    {
      title: "x",
      icon: <IconBrandX className="w-6 h-6 text-neutral-500" />, // Uniform sizing
      href: "https://x.com/dinajara44888",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="w-6 h-6 text-neutral-500" />, // Uniform sizing
      href: "https://github.com/kavishkadinajara",
    },
  ];

  return (
    <div className="flex items-center justify-center ">
      <FloatingDock items={links} mobileClassName="translate-y-20" />
    </div>
  );
}
