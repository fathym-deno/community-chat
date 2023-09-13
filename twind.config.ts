import { Options } from "$fresh/plugins/twind.ts";
import { defineConfig } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";
//import * as colors from 'twind-colors';

//const defaultTheme = require("tailwindcss/defaultTheme");
//const colors = require('tailwindcss/colors')

export default {
  ...defineConfig({
    presets: [presetAutoPrefix(), presetTailWind()],
    theme: {
      extend: {
        colors: {
          //primary: colors.blue,
          //secondary: colors.indigo,
          
          transparent: 'transparent',
          current: 'currentColor',
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
