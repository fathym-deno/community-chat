export type Portrayal = {
  lookup: string;
  name: string;
  type: string;
  // deno-lint-ignore no-explicit-any
  details: any;
};

export class PortrayalManager {
  private portrayals: Portrayal[] = [];

  List(): Portrayal[] {
    return this.portrayals;
  }

  Save(portrayal: Portrayal): void {
    this.portrayals.push(portrayal);
  }
}
