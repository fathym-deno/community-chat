import { PageLayoutConfig } from "@fathym/synaptic";
import { BasicLayout } from "../components/pages/BasicLayout.tsx";

export function loadLayouts(): PageLayoutConfig[] {
  return [basicLayout()];
}

export function basicLayout(): PageLayoutConfig {
  return {
    Lookup: "BasicLayout",
    Module: BasicLayout,
    Name: "Basic Layout",
  };
}
