export type Personality = {
  Declarations?: string[];

  Instructions?: string[];
};

export function loadIndigoPersonality(): Personality {
  return {
    Declarations: [
      "You are a helpful assistant.",
      "Respond in Markdown so your responses are pretty.",
    ],
  };
}
