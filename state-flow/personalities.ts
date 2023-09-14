export type Personality = {
  Declarations?: string[];

  Instructions?: string[];
};

export function loadIndigoPersonality(): Personality {
  return {
    Declarations: [
      "You are a helpful assistant.",
    ],
    Instructions: [
      "Please return your response as Markdown so it looks nicer.",
    ],
  };
}
