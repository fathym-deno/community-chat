import { FunctionDefinition } from "npm:@azure/openai@next";

export type Portrayal = {
  lookup: string;
  name: string;
  type: string;
  // deno-lint-ignore no-explicit-any
  details: any;
};
class PortrayalManager {
  private portrayals: Portrayal[] = [];

  public List(): Portrayal[] {
    return this.portrayals;
  }

  public Options(): FunctionDefinition[] {
    return loadHarborFunctions();
  }

  public Save(portrayal: Portrayal): void {
    this.portrayals.push(portrayal);
  }
}

export const Portrayals = new PortrayalManager();

export function loadHarborFunctions(): FunctionDefinition[] {
  return [basicReportPortrayal(), bulletListPortrayal(), pieChartPortrayal()];
}

export function basicReportPortrayal(): FunctionDefinition {
  return {
    name: "BasicReportPortrayal",
    description:
      "The basic report portrayal is used to provide out a title, abstract, and full report content.",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the report should be a short, understandable set of text that describes what is in the report.",
        },
        abstract: {
          type: "string",
          description:
            "The abstract is a more detailed description of the report that can be used by a user to discern if the report is useful for them.",
        },
        content: {
          type: "string",
          description:
            "This is the complete report content, it should be verbose and express a detailed set of information to inform report consumers. It should be written as MDX, and contain 5 to 10 sections of markdown content, where each section is 200 - 500 characters. This makes each report content 1000 - 5000 characters long.",
        },
      },
      required: ["title", "abstract", "content"],
    },
  };
}

export function bulletListPortrayal(): FunctionDefinition {
  return {
    name: "BulletListPortrayal",
    description:
      "The bullet list portrayal is used to provide out a title, abstract, and the bullets for the list.",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the report should be a short, understandable set of text that describes what is in the report.",
        },
        abstract: {
          type: "string",
          description:
            "The abstract is a more detailed description of the report that can be used by a user to discern if the report is useful for them.",
        },
        bullets: {
          type: "array",
          description:
            "The 3 - 7 highlighted bullet points to use for the report.",
          items: {
            type: "string",
            description:
              "This is a unique, highlighted bullet point, to use for informing the user about important information.",
          },
        },
      },
      required: ["title", "abstract", "list"],
    },
  };
}

export function pieChartPortrayal(): FunctionDefinition {
  return {
    name: "PieChartPortrayal",
    description:
      "The pie chart portrayal is used to pull together a chart that represents  acollection of data as a percentage of a whole.",
    parameters: {
      type: "object",
      description:
        "The pie chart represents a slice of data from the reports that represents data in a pie chart.",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the pie chart, short to describe what is in the chart.",
        },
        labels: {
          type: "array",
          description:
            "The labels represent the entity whose data is being tracked. There should be the same number of labels in this array as are in the data array.",
          items: {
            type: "string",
            description:
              "This is a unique label that represents the entity that's data is being tracked.",
          },
        },
        data: {
          type: "array",
          description:
            "The data represents the value of data that is being tracked for an entity label. There should be the same number of datas in this array as are in the labels array.",
          items: {
            type: "string",
            description: "This is the data value to use for a specific label.",
          },
        },
      },
      required: ["title", "labels", "data"],
    },
  };
}
