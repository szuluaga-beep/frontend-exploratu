export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Exploratú",
  description:
    "Exploratú es la plataforma para descubrir y reservar tours únicos. Encuentra experiencias locales, aventuras culturales y recorridos guiados en los mejores destinos.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tours",
      href: "/tours",
    },
  ],
  navMenuItems: [
    {
      label: "Tours",
      href: "/tours",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
