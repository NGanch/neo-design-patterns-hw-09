import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class CsvIterator implements Iterable<UserData> {
  private users: UserData[];

  constructor(filePath: string) {
    const fileContent = readFileSync(filePath, "utf-8");
    const lines = fileContent.trim().split("\n");
    const [, ...dataLines] = lines; // Пропускаємо заголовок

    this.users = dataLines.map(line => {
      const [id, name, email, phone] = line.split(",");
      return {
        id: Number(id),
        name,
        email,
        phone
      };
    });
  }

  [Symbol.iterator](): Iterator<UserData> {
    let index = 0;
    const users = this.users;

    return {
      next(): IteratorResult<UserData> {
        if (index < users.length) {
          return { value: users[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
}

