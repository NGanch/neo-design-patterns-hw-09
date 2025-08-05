import { DataExporter } from './DataExporter';
import * as fs from 'fs';

export class CsvExporter extends DataExporter {
  protected render(): void {
    const headers = 'id,name,email,phone';
    const rows = this.data.map(user =>
      `${user.id},${user.name},${user.email},${user.phone}`
    );
    this.result = [headers, ...rows].join('\n');
  }

  protected save(): void {
    fs.writeFileSync('users.csv', this.result, 'utf-8');
  }
}

