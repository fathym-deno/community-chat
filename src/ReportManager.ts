import { FunctionDefinition } from "npm:@azure/openai@next";

export type Report = {
  Lookup: string;
  Layout: ReportLayout;
  Name: string;
  Slots: ReportLayoutSlot[];
};

export class ReportManager {
  constructor(protected kv: Deno.Kv, protected reportsRoot = ["Reports"]) {}

  public async Delete(reportLookup: string): Promise<void> {
    await this.kv.delete([...this.reportsRoot, reportLookup]);
  }

  public async Get(reportLookup: string): Promise<Report> {
    const { value } = await this.kv.get([...this.reportsRoot, reportLookup]);

    return value as Report;
  }

  public async List(): Promise<Report[]> {
    const reportList = await this.kv.list({ prefix: this.reportsRoot });

    const reports: Report[] = [];

    for await (const report of reportList) {
      const { value } = report;

      reports.push(value as Report);
    }

    return reports;
  }

  public Layouts(): ReportLayout[] {
    return loadLayouts();
  }

  public async Save(report: Report): Promise<void> {
    await this.kv.set([...this.reportsRoot, report.Lookup], report);
  }
}

export type ReportLayout = {
  Columns: number;
};

export type ReportLayoutSlot = {
  PortrayalLookup: string;
};

export function loadLayouts(): ReportLayout[] {
  return [basicLayout()];
}

export function basicLayout(): ReportLayout {
  return {
    Columns: 3,
  };
}
