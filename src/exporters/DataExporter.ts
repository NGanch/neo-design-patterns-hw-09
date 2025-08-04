import axios from 'axios';
import { UserData } from '../data/UserData';

export abstract class DataExporter {
  protected users: UserData[] = [];
  protected result: string = '';

  public async export(): Promise<void> {
    await this.load();
    this.transform();
    this.beforeRender();
    this.render();
    this.afterRender();
    await this.save();
  }

  protected async load(): Promise<void> {
    const response = await axios.get<UserData[]>('https://jsonplaceholder.typicode.com/users');
    this.users = response.data;
  }

  protected transform(): void {
    this.users = this.users
      .map(({ id, name, email, phone }) => ({ id, name, email, phone }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  protected beforeRender(): void {
    // optional hook
  }

  protected abstract render(): void;

  protected afterRender(): void {
    // optional hook
  }

  protected abstract save(): Promise<void>;
}
