import {loadFont} from "@remotion/fonts";
import {staticFile} from "remotion";
import {theme} from "./theme";

/** Fuentes locales: se cargan una vez y el render espera a que estén listas. */
void Promise.all([
  loadFont({
    family: theme.fonts.sans,
    url: staticFile("assets/fonts/Inter-Latin.woff2"),
    weight: "100 900",
  }),
  loadFont({
    family: theme.fonts.mono,
    url: staticFile("assets/fonts/JetBrainsMono-Latin.woff2"),
    weight: "100 800",
  }),
]);
