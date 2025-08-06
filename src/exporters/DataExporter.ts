import { UserData } from "../data/UserData";
// import fetch from "node-fetch";

export abstract class DataExporter {
  protected data: UserData[] = [];
  protected result: string = "";

  public async export() {
    await this.load();
    this.transform();
    this.beforeRender();
    this.result = this.render();
    this.afterRender();
    this.save();
  }

  protected async load() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const rawData = await response.json();
    this.data = rawData.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    }));
  }

  protected transform() {
    this.data.sort((a, b) => a.name.localeCompare(b.name));
  }

  protected beforeRender() {}

  protected afterRender() {}

  protected abstract render(): string;
  protected abstract save(): void;
}

