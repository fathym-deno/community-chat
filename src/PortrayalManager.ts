export type Portrayal = {
  lookup: string;
  name: string;
  type: string;
  details: any;
};

export class PortrayalManager {
  private portrayals: Portrayal[] = [];

  listPortrayals(): Portrayal[] {
    return this.portrayals;
  }

  savePortrayal(portrayal: Portrayal): void {
    this.portrayals.push(portrayal);
  }
}