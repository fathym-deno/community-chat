//import { Options } from "$fresh/plugins/twind.ts";
import { defineConfig } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";
import * as colors from "twind-preset-tailwind/colors";
import presetTailwindForms from "twind-preset-tailwind-forms";

export default {
  ...defineConfig({
    presets: [presetAutoPrefix(), presetTailWind(), presetTailwindForms()],
    theme: {
      extend: {
        colors: {
          primary: colors.blue,
          secondary: colors.indigo,

          transparent: "transparent",
          current: "currentColor",
        },
        fontFamily: {
          //sans: ["Inter", ...defaultTheme.fontFamily.sans],
        },
      },
    },
  }),
  selfURL: import.meta.url,
  // deno-lint-ignore no-explicit-any
} as any;

// plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
