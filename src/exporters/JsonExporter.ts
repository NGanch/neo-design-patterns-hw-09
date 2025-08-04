import { DataExporter } from './DataExporter';
import fs from 'fs/promises';

export class JsonExporter extends DataExporter {
  protected render(): void {
    this.result = JSON.stringify(this.users, null, 2);
  }

  protected async save(): Promise<void> {
    await fs.writeFile('users.json', this.result, 'utf-8');
  }
}
