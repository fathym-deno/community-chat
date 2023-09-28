import { PersonalitiesConfig } from "@fathym/synaptic";

const personalities: PersonalitiesConfig = {};

export const HarborPersonality = Symbol.for("harbor");

export const IndigoPersonality = Symbol.for("indigo");

personalities[HarborPersonality] = {
  Declarations: ["You are a helpful industrial information assistant."],
  Instructions: [
    "Please return your response as Markdown (MDX) so it looks nicer.",
  ],
  Temperature: 0.2,
};

export default personalities;
