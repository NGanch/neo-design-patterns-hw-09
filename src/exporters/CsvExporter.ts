import { DataExporter } from './DataExporter';
import fs from 'fs/promises';

export class CsvExporter extends DataExporter {
  protected render(): void {
    const headers = 'id,name,email,phone';
    const rows = this.users.map(u => `${u.id},${u.name},${u.email},${u.phone}`);
    this.result = [headers, ...rows].join('\n');
  }

  protected async save(): Promise<void> {
    await fs.writeFile('users.csv', this.result, 'utf-8');
  }
}
