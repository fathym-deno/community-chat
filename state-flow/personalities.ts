export type Personality = {
  Declarations?: string[];

  Instructions?: string[];
};

export function loadIndigoPersonality(): Personality {
  return {
    Declarations: [
      "You are a helpful assistant.",
      "Please return your response as Markdown (MDX) so it looks nicer.",
    ],
    Instructions: [
      "Please return your response as Markdown (MDX) so it looks nicer.",
    ],
  };
}
