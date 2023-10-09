import { FunctionDefinition } from "npm:@azure/openai@next";

export type Portrayal = {
  Lookup: string;

  Name: string;

  Type: string;

  // deno-lint-ignore no-explicit-any
  Details: any;
};

export class PortrayalManager {
  constructor(
    protected kv: Deno.Kv,
    protected portrayalsRoot = ["Portrayals"],
  ) {}

  public async Delete(portrayalLookup: string): Promise<void> {
    await this.kv.delete([...this.portrayalsRoot, portrayalLookup]);
  }

  public async Get(portrayalLookup: string): Promise<Portrayal> {
    const { value } = await this.kv.get([
      ...this.portrayalsRoot,
      portrayalLookup,
    ]);

    return value as Portrayal;
  }

  public async List(): Promise<Portrayal[]> {
    const portrayalList = await this.kv.list({ prefix: this.portrayalsRoot });

    const portrayals: Portrayal[] = [];

    for await (const portrayal of portrayalList) {
      const { value } = portrayal;

      portrayals.push(value as Portrayal);
    }

    return portrayals;
  }

  public Options(): FunctionDefinition[] {
    return loadHarborFunctions();
  }

  public async Save(portrayal: Portrayal): Promise<void> {
    await this.kv.set([...this.portrayalsRoot, portrayal.Lookup], portrayal);
  }
}

export function loadHarborFunctions(): FunctionDefinition[] {
  return [
    basicReportPortrayal(),
    bulletListPortrayal(),
    barChartPortrayal(),
    lineChartPortrayal(),
    pieChartPortrayal(),
    doughnutChartPortrayal(),
    bubbleChartPortrayal(),
    scatterChartPortrayal(),
    polarChartPortrayal(),
    radarChartPortrayal(),
  ];
}

export function basicReportPortrayal(): FunctionDefinition {
  return {
    name: "BasicSummaryPortrayal",
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

export function barChartPortrayal(): FunctionDefinition {
  return {
    name: "BarChartPortrayal",
    description:
      "The bar chart portrayal is used to pull together a chart that represents a collection of data as a percentage of a whole.",
    parameters: {
      type: "object",
      description:
        "The bar chart represents a slice of data from the reports that represents data in a pie chart.",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the bar chart, short to describe what is in the chart.",
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
            "The data represents the value of data that is being tracked for an entity label. There should be the same number of data elements in this array as are in the labels array.",
          items: {
            type: "number",
            description: "This is the data value to use for a specific label.",
          },
        },
      },
      required: ["title", "labels", "data"],
    },
  };
}

export function lineChartPortrayal(): FunctionDefinition {
  return {
    name: "LineChartPortrayal",
    description:
      "The line chart portrayal is used to pull together a chart that represents a collection of data as a percentage of a whole.",
    parameters: {
      type: "object",
      description:
        "The line chart represents a slice of data from the reports that represents data in a pie chart.",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the line chart, short to describe what is in the chart.",
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
            "The data represents the value of data that is being tracked for an entity label. There should be the same number of data elements in this array as are in the labels array.",
          items: {
            type: "number",
            description: "This is the data value to use for a specific label.",
          },
        },
      },
      required: ["title", "labels", "data"],
    },
  };
}

export function pieChartPortrayal(): FunctionDefinition {
  return {
    name: "PieChartPortrayal",
    description:
      "The pie chart portrayal is used to pull together a chart that represents a collection of data as a percentage of a whole.",
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
            "The data represents the value of data that is being tracked for an entity label. There should be the same number of data elements in this array as are in the labels array.",
          items: {
            type: "number",
            description: "This is the data value to use for a specific label.",
          },
        },
      },
      required: ["title", "labels", "data"],
    },
  };
}

export function doughnutChartPortrayal(): FunctionDefinition {
  return {
    name: "DoughnutChartPortrayal",
    description:
      "The doughnut chart portrayal is used to pull together a chart that represents a collection of data as a percentage of a whole.",
    parameters: {
      type: "object",
      description:
        "The doughnut chart represents a slice of data from the reports that represents data in a pie chart.",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the doughnut chart, short to describe what is in the chart.",
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
            "The data represents the value of data that is being tracked for an entity label. There should be the same number of data elements in this array as are in the labels array.",
          items: {
            type: "number",
            description: "This is the data value to use for a specific label.",
          },
        },
      },
      required: ["title", "labels", "data"],
    },
  };
}

export function bubbleChartPortrayal(): FunctionDefinition {
  return {
    name: "BubbleChartPortrayal",
    description:
      "The bubble chart portrayal is used to visualize a dataset with three dimensions. Each entity with its triplet (v1, v2, v3) of associated data is plotted as a disk that expresses two of the vi values through the disk's xy location and the third through its size.",
    parameters: {
      type: "object",
      description:
        "The bubble chart represents a collection of data points with their x, y coordinates and radius (r).",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the bubble chart, used to briefly describe what is in the chart.",
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
            "The datasets represent the collection of data points. Each data point should have x, y, and r values.",
          items: {
            type: "object",
            description:
              "This is a unique data object that includes x, y, and r values.",
            properties: {
              x: {
                type: "number",
                description: "The x-coordinate of the data point.",
              },
              y: {
                type: "number",
                description: "The y-coordinate of the data point.",
              },
              r: {
                type: "number",
                description:
                  "The radius of the data point. If there is no value for this radius, use a standard value.",
              },
            },
            required: ["x", "y", "r"],
          },
        },
      },
      required: ["title", "labels", "data"],
    },
  };
}

export function scatterChartPortrayal(): FunctionDefinition {
  return {
    name: "ScatterChartPortrayal",
    description:
      "The scatter chart portrayal is used to visualize a dataset with two dimensions. Each entity with x and y of associated data is plotted as a point that expresses two values.",
    parameters: {
      type: "object",
      description:
        "The scatter chart represents a collection of data points with their x, y coordinates.",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the scatter chart, used to briefly describe what is in the chart.",
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
            "The datasets represent the collection of data points. Each data point should have x and y.",
          items: {
            type: "object",
            description: "This is a unique data object that includes x and y.",
            properties: {
              x: {
                type: "number",
                description: "The x-coordinate of the data point.",
              },
              y: {
                type: "number",
                description: "The y-coordinate of the data point.",
              },
            },
            required: ["x", "y"],
          },
        },
      },
      required: ["title", "labels", "data"],
    },
  };
}

export function polarChartPortrayal(): FunctionDefinition {
  return {
    name: "PolarChartPortrayal",
    description:
      "The polar area chart portrayal is used to pull together a chart that represents a collection of data as a percentage of a whole.",
    parameters: {
      type: "object",
      description:
        "The polar area chart represents a slice of data from the reports that represents data in a pie chart.",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the polar area chart, short to describe what is in the chart.",
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
            "The data represents the value of data that is being tracked for an entity label. There should be the same number of data elements in this array as are in the labels array.",
          items: {
            type: "number",
            description: "This is the data value to use for a specific label.",
          },
        },
      },
      required: ["title", "labels", "data"],
    },
  };
}

export function radarChartPortrayal(): FunctionDefinition {
  return {
    name: "RadarChartPortrayal",
    description:
      "The radar chart portrayal is used to pull together a chart that represents a collection of data as a percentage of a whole.",
    parameters: {
      type: "object",
      description:
        "The radar chart represents a slice of data from the reports that represents data in a pie chart.",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the radar chart, short to describe what is in the chart.",
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
            "The data represents the value of data that is being tracked for an entity label. There should be the same number of data elements in this array as are in the labels array.",
          items: {
            type: "number",
            description: "This is the data value to use for a specific label.",
          },
        },
      },
      required: ["title", "labels", "data"],
    },
  };
}
