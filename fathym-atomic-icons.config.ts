import { IconSetConfig, IconSetGenerateConfig } from "@fathym/atomic-icons";

export const curIconSetConfig: IconSetConfig = {
  IconMap: {
    "user": "https://api.iconify.design/heroicons:user-solid.svg",
    "academic": "https://api.iconify.design/heroicons:academic-cap-solid.svg",
    "bot": "https://api.iconify.design/fluent:bot-24-filled.svg",
    "lovebot": "https://api.iconify.design/mdi:robot-love.svg",
    "x-circle": "https://api.iconify.design/bi:x-circle.svg",
    "check-circle":
      "https://api.iconify.design/material-symbols:check-circle.svg",
    exclaim: "https://api.iconify.design/bi:exclamation-circle.svg",
  },
  Optimize: true,
};

export const curIconSetGenerateConfig: IconSetGenerateConfig = {
  Exports: true,
  IconSet: curIconSetConfig,
  SpriteSheet: "./iconset/icons",
};
