import { readFileSync } from "fs";
import { UserData } from "../data/UserData";
import { XMLParser } from "fast-xml-parser";

export class XmlIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const content = readFileSync(filePath, "utf-8");
    const parser = new XMLParser();
    const parsed = parser.parse(content);

    this.users = (parsed.users.user || []).map((user: any) => ({
      id: Number(user.id),
      name: user.name,
      email: user.email,
      phone: user.phone,
    }));
  }

  [Symbol.iterator](): Iterator<UserData> {
    let index = 0;
    const users = this.users;
    return {
      next(): IteratorResult<UserData> {
        if (index < users.length) {
          return { value: users[index++], done: false };
        } else {
          return { value: null, done: true };
        }
      },
    };
  }
}
