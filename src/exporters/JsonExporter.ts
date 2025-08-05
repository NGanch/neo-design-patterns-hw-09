import { DataExporter } from './DataExporter';
import * as fs from 'fs';

export class JsonExporter extends DataExporter {
  protected render(): void {
    this.result = JSON.stringify(this.data, null, 2);
  }

  protected save(): void {
    fs.writeFileSync('users.json', this.result, 'utf-8');
  }
}

