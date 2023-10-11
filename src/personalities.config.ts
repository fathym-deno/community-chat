import { PersonalitiesConfig } from "@fathym/synaptic";

const personalities: PersonalitiesConfig = {};

export const HarborPersonality = Symbol.for("harbor");

export const PortrayalsPersonality = Symbol.for("portrayals");

personalities[HarborPersonality] = {
  Declarations: ["You are a helpful industrial information assistant."],
  Instructions: [
    "Please return your response as Markdown (MDX) so it looks nicer.",
  ],
  Temperature: 0.2,
};

personalities[PortrayalsPersonality] = {
  Declarations: ["You are a helpful industrial information assistant."],
  Instructions: [
    "You cannot have literal control characters in string literals, you must use an escape sequence.",
  ],
  Commands: [{
    From: "user",
    Content: "Generate the page for me in valid JSON, `\n` for new lines.",
  }],
};

// personalities[PortrayalsPersonality] = personalities[HarborPersonality];
// personalities[PortrayalsPersonality].MaxTokens = 1500;
// personalities[PortrayalsPersonality].Temperature = .4;
// personalities[PortrayalsPersonality].Declarations!.push(
//   "You are responsible for invoking the Portrayals function given the context of the current chat.",
// "You are responsible for invoking the Portrayals function, but before invoking it you should collect all the parameters from the user.",
// );
// personalities[PortrayalsPersonality].Instructions!.push(
//   "Once all the parameters are collected, confirm with the user that they are happy with the portrayal information, and then call the function.",
// );

export const IndigoPersonality = Symbol.for("indigo");

export default personalities;
