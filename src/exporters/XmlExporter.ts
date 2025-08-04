import { DataExporter } from './DataExporter';
import fs from 'fs/promises';

export class XmlExporter extends DataExporter {
  protected render(): void {
    const usersXml = this.users.map(u => `
  <user>
    <id>${u.id}</id>
    <name>${u.name}</name>
    <email>${u.email}</email>
    <phone>${u.phone}</phone>
  </user>`).join('');

    this.result = `<?xml version="1.0" encoding="UTF-8"?>\n<users>${usersXml}\n</users>`;
  }

  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  protected async save(): Promise<void> {
    await fs.writeFile('users.xml', this.result, 'utf-8');
  }
}

