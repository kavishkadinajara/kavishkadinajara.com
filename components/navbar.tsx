/* eslint-disable react/jsx-no-undef */
"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
} from "@/components/icons";

export const Navbar = () => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="z-50"
      initial={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <NextUINavbar
        className="md:py-4 py-1 border-2 border-cyan-700 shadow-cyan-700 mt-3 rounded-full shadow-lg  hover:border-green-600 hover:shadow-green-800"
        maxWidth="xl"
        position="sticky"
      >
        {/* Navbar Brand & Logo */}
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Image
                alt="logo"
                className="w-20 md:w-32"
                height={110}
                src="/logo.png"
                width={110}
              />
            </NextLink>
          </NavbarBrand>
          {/* Nav Links */}
          <ul className="hidden lg:flex text-md md:text-lg gap-4 justify-start ml-32">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <motion.div
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-cyan-300 text-cyan-400 hover:text-green-600 hover:font-xl text-lg",
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </motion.div>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        {/* Social Icons and Theme Toggle */}
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <motion.div
              transition={{ duration: 0.5 }}
              whileHover={{ rotate: 360 }}
            >
              <Link
                isExternal
                aria-label="Twitter"
                href={siteConfig.links.twitter}
              >
                <TwitterIcon className="text-white" />
              </Link>
            </motion.div>
            <motion.div
              transition={{ duration: 0.5 }}
              whileHover={{ rotate: 360 }}
            >
              <Link
                isExternal
                aria-label="Discord"
                href={siteConfig.links.discord}
              >
                <DiscordIcon className="text-white" />
              </Link>
            </motion.div>
            <motion.div
              transition={{ duration: 0.5 }}
              whileHover={{ rotate: 360 }}
            >
              <Link
                isExternal
                aria-label="Github"
                href={siteConfig.links.github}
              >
                <GithubIcon className="text-white" />
              </Link>
            </motion.div>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              isExternal
              as={Link}
              className="text-sm font-normal text-white bg-lime-600 hover:bg-lime-500 transition-all duration-300"
              href={siteConfig.links.sponsor}
              startContent={<HeartFilledIcon className="text-white" />}
              variant="flat"
            >
              Hire Me
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Navbar Toggle */}
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-white" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile Navbar Menu */}
        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-4">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="text-white text-lg hover:text-cyan-300 transition-all duration-300"
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </motion.div>
  );
};
